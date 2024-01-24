using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webapp_accessability.Data;
using webapp_accessability.Models;

[ApiController]
[Route("[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AdminController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("GetOnderzoeken")]
    public async Task<ActionResult<IEnumerable<Onderzoek>>> GetOnderzoeken()
    {
        var onderzoeken = await _context.Onderzoeken.ToListAsync();
        return Ok(onderzoeken); // Ensure proper serialization
    }

    [HttpDelete]
    [Route("VerwijderOnderzoek/{id}")]
    public async Task<ActionResult> VerwijderOnderzoek(int id)
    {
        var onderzoek = await _context.Onderzoeken.FindAsync(id);
        if (onderzoek == null)
        {
            return NotFound("Onderzoek not found");
        }

        _context.Onderzoeken.Remove(onderzoek);
        await _context.SaveChangesAsync();

        return Ok("Onderzoek deleted successfully");
    }

    [HttpGet]
    [Route("GetGebruikers")]
    public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetGebruikers()
    {
        var gebruikers = await _context.Users.ToListAsync();
        return Ok(gebruikers); // Ensure proper serialization
    }

    [HttpDelete]
    [Route("VerwijderGebruiker/{id}")]
    public async Task<ActionResult> VerwijderGebruiker(string id)
    {
        var gebruiker = await _context.Users.FindAsync(id);
        if (gebruiker == null)
        {
            return NotFound("Gebruiker not found");
        }

        _context.Users.Remove(gebruiker);
        await _context.SaveChangesAsync();

        return Ok("Gebruiker deleted successfully");
    }
}
