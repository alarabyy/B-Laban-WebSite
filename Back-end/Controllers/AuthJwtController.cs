using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Belabn.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Belabn.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthJwtController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _database;

        public AuthJwtController(IConfiguration configuration, AppDbContext database)
        {
            _configuration = configuration;
            _database = database;
        }

        // Encrypt password using HMACSHA512, output salt and hash
        private void EncryptPassword(string plainPassword, out byte[] salt, out byte[] hash)
        {
            using (var hmac = new HMACSHA512())
            {
                salt = hmac.Key;
                hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(plainPassword));
            }
        }

        // Verify password by recomputing the hash with the stored salt and comparing
        private bool VerifyPassword(string password, byte[] salt, byte[] hash)
        {
            using (var hmac = new HMACSHA512(salt))
            {
                var computed = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computed.SequenceEqual(hash);
            }
        }

        // Create JWT Token with claims
        private string CreateToken(UserModel user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Role, "Default User") // Example role
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private TokenData GenerateRefresh()
        {
            return new TokenData
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Created = DateTime.Now,
                Expired = DateTime.Now.AddDays(1)
            };
        }

        private void SetRefresh(TokenData newRefreshToken, UserModel user)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expired
            };

            Response.Cookies.Append("RefreshedToken", newRefreshToken.Token, cookieOptions);

            user.RefreshedToken = newRefreshToken.Token;
            user.TokenCreateDate = newRefreshToken.Created;
            user.TokenExpirationDate = newRefreshToken.Expired;
        }

        // Register new user
        [HttpPost("Register")]
        public async Task<ActionResult> Register(UserData registerUser)
        {
            EncryptPassword(registerUser.Password, out byte[] salt, out byte[] hash);

            var user = new UserModel
            {
                UserName = registerUser.UserName,
                Email = registerUser.Email,  // ← هنا تحفظ البريد الإلكتروني
                PasswordSalt = salt,
                PasswordHash = hash
            };

            _database.UsersModel.Add(user);
            await _database.SaveChangesAsync();

            return Ok("User created successfully");
        }


        // Login user and return refreshed token
        [HttpPost("Login")]
        public async Task<ActionResult<string>> Login(UserData loginUser)
        {
            // Find user by username (assuming UserName is unique)
            var user = await _database.UsersModel.FirstOrDefaultAsync(u => u.UserName == loginUser.UserName);
            if (user == null)
                return BadRequest("User not found");

            if (!VerifyPassword(loginUser.Password, user.PasswordSalt, user.PasswordHash))
                return BadRequest("Invalid password");

            string token = CreateToken(user);
            var refresh = GenerateRefresh();
            SetRefresh(refresh, user);
            await _database.SaveChangesAsync();

            return Ok(new { Token = token, RefreshToken = user.RefreshedToken });
        }
    }
}
