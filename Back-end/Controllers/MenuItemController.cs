using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Belabn.Models;
using Microsoft.AspNetCore.Authorization;
using Belabn.DTO;

[Route("api/[controller]")]
[ApiController]
public class MenuItemsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public MenuItemsController(AppDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MenuItem>>> GetMenuItems()
    {
        return await _context.MenuItems.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MenuItem>> GetMenuItem(int id)
    {
        var item = await _context.MenuItems.FindAsync(id);
        if (item == null) return NotFound();
        return item;
    }

    [HttpPost]
    //[Authorize]
    public async Task<ActionResult<MenuItem>> PostMenuItem([FromForm] MenuItemDto dto)
    {
        if (dto.Image == null || dto.Image.Length == 0)
            return BadRequest("Image is required");

        // توليد اسم فريد للصورة
        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Image.FileName);
        var imagePath = Path.Combine(_env.WebRootPath ?? "wwwroot", "images", fileName);

        // حفظ الصورة في السيرفر
        using (var stream = new FileStream(imagePath, FileMode.Create))
        {
            await dto.Image.CopyToAsync(stream);
        }

        // إنشاء العنصر وحفظه في الداتا بيز
        var menuItem = new MenuItem
        {
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            ImageUrl = "/images/" + fileName
        };

        _context.MenuItems.Add(menuItem);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMenuItem), new { id = menuItem.Id }, menuItem);
    }

    [HttpPut("{id}")]
    //[Authorize]
    public async Task<IActionResult> PutMenuItem(int id, MenuItem menuItem)
    {
        if (id != menuItem.Id) return BadRequest();

        _context.Entry(menuItem).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.MenuItems.Any(e => e.Id == id)) return NotFound();
            else throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    //[Authorize]
    public async Task<IActionResult> DeleteMenuItem(int id)
    {
        var item = await _context.MenuItems.FindAsync(id);
        if (item == null) return NotFound();

        _context.MenuItems.Remove(item);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
