using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Belabn.Models;
using Belabn.DTOs;
using Microsoft.AspNetCore.Hosting;

namespace Belabn.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CreateYourDishesController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public CreateYourDishesController(AppDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    // Get all dishes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CreateYourDish>>> GetDishes()
    {
        return await _context.CreatedDishes.ToListAsync();
    }

    // Get a specific dish by ID
    [HttpGet("{id}")]
    public async Task<ActionResult<CreateYourDish>> GetDish(int id)
    {
        var dish = await _context.CreatedDishes.FindAsync(id);
        if (dish == null) return NotFound();
        return dish;
    }

    // Create a new dish (with image upload)
    [HttpPost]
    public async Task<ActionResult<CreateYourDish>> PostDish([FromForm] CreateYourDishDTO model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        string imagePath = string.Empty;

        if (model.Image != null && model.Image.Length > 0)
        {
            string uploadsFolder = Path.Combine(_env.WebRootPath, "images");
            Directory.CreateDirectory(uploadsFolder); // Ensure directory exists

            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(model.Image.FileName);
            string filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await model.Image.CopyToAsync(stream);
            }

            imagePath = "/images/" + fileName; // For frontend use
        }

        var dish = new CreateYourDish
        {
            DishName = model.DishName,
            Ingredients = model.Ingredients,
            email = model.Email,
            fullname = model.Fullname,
            ImageUrl = imagePath
        };

        _context.CreatedDishes.Add(dish);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetDish), new { id = dish.Id }, dish);
    }

    // Update existing dish
    [HttpPut("{id}")]
    public async Task<IActionResult> PutDish(int id, CreateYourDish dish)
    {
        if (id != dish.Id) return BadRequest();

        _context.Entry(dish).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.CreatedDishes.Any(e => e.Id == id))
                return NotFound();
            else
                throw;
        }

        return NoContent();
    }

    // Delete dish
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDish(int id)
    {
        var dish = await _context.CreatedDishes.FindAsync(id);
        if (dish == null) return NotFound();

        // Delete image file if exists
        if (!string.IsNullOrEmpty(dish.ImageUrl))
        {
            var fullImagePath = Path.Combine(_env.WebRootPath, dish.ImageUrl.TrimStart('/'));
            if (System.IO.File.Exists(fullImagePath))
            {
                System.IO.File.Delete(fullImagePath);
            }
        }

        _context.CreatedDishes.Remove(dish);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
