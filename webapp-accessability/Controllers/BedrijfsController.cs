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
[Authorize(Roles = "Admin,Bedrijf")]
public class BedrijfsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BedrijfsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("GetOnderzoeken/{bedrijfId}")]
    public async Task<ActionResult<IEnumerable<Onderzoek>>> GetOnderzoeken(string bedrijfId)
    {
        var onderzoeken = await _context.Onderzoeken
            .Where(o => o.BedrijfId == bedrijfId)
            .ToListAsync();

        return onderzoeken;
    }

    [HttpPost]
    [Route("CreateOnderzoek")]
    public async Task<ActionResult<Onderzoek>> CreateOnderzoek(Onderzoek onderzoek)
    {
        _context.Onderzoeken.Add(onderzoek);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetOnderzoeken", new { id = onderzoek.Id }, onderzoek);
    }
}
