using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Belabn.Models;
using Belabn.DTO;

[Route("api/[controller]")]
[ApiController]
public class EventsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public EventsController(AppDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
    {
        return await _context.Events.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Event>> GetEvent(int id)
    {
        var evnt = await _context.Events.FindAsync(id);
        if (evnt == null) return NotFound();
        return evnt;
    }

    [HttpPost]
    public async Task<ActionResult<Event>> PostEvent([FromForm] EventDto dto)
    {
        // تحقق من وجود الصورة
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

        // إنشاء الحدث وحفظه في قاعدة البيانات
        var evnt = new Event
        {
            Title = dto.Title,
            Description = dto.Description,
            EventDate = dto.EventDate,
            ImageUrl = "/images/" + fileName
        };

        _context.Events.Add(evnt);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEvent), new { id = evnt.Id }, evnt);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutEvent(int id, Event evnt)
    {
        if (id != evnt.Id) return BadRequest();

        _context.Entry(evnt).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Events.Any(e => e.Id == id)) return NotFound();
            else throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var evnt = await _context.Events.FindAsync(id);
        if (evnt == null) return NotFound();

        _context.Events.Remove(evnt);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
