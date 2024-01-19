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
        // Retrieve and return all onderzoeken from the database
        var onderzoeken = await _context.Onderzoeken.ToListAsync();
        return Ok(onderzoeken);
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

        // Remove the onderzoek from the database
        _context.Onderzoeken.Remove(onderzoek);
        await _context.SaveChangesAsync();

        return Ok("Onderzoek deleted successfully");
    }
}
