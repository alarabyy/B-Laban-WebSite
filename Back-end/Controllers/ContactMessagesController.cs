using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Belabn.Models;
using Microsoft.AspNetCore.Authorization;

[Route("api/[controller]")]
[ApiController]
public class ContactMessagesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContactMessagesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    //[Authorize]
    public async Task<ActionResult<IEnumerable<ContactMessage>>> GetMessages()
    {
        return await _context.ContactMessages.ToListAsync();
    }

    [HttpGet("{id}")]
    //[Authorize]
    public async Task<ActionResult<ContactMessage>> GetMessage(int id)
    {
        var message = await _context.ContactMessages.FindAsync(id);
        if (message == null) return NotFound();
        return message;
    }

    [HttpPost]
    public async Task<ActionResult<ContactMessage>> PostMessage(ContactMessage message)
    {
        _context.ContactMessages.Add(message);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetMessage), new { id = message.Id }, message);
    }

    //[Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMessage(int id)
    {
        var message = await _context.ContactMessages.FindAsync(id);
        if (message == null) return NotFound();
        _context.ContactMessages.Remove(message);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
