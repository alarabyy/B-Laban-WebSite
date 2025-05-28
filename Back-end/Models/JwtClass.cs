using System.ComponentModel.DataAnnotations;

namespace Belabn.Models
{
    public class UserModel //------> for Database Storing
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public byte[] PasswordSalt { get; set; }
        public byte[] PasswordHash { get; set; }

        //--------------Nullable Properties
        public string? RefreshedToken { get; set; }
        public DateTime? TokenCreateDate { get; set; }
        public DateTime? TokenExpirationDate { get; set; }

        //----------If User Have ONLY one role
        public string? UserRole { get; set; }
    }
    public class UserData // Used With Actions ONLY
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }  // ← أضف هذا السطر

    }

    public class TokenData // Used With Actions ONLY
    {
        public string? Token { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Expired { get; set; }
    }

}
