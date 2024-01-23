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
public class MedewerkerController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public MedewerkerController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("GetOnderzoeken")]
    public async Task<ActionResult<IEnumerable<Onderzoek>>> GetOnderzoeken()
    {
        var onderzoeken = await _context.Onderzoeken.ToListAsync();
        return onderzoeken;
    }

    // [HttpGet]
    // [Route("GetBedrijfGebruikers")]
    // public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetBedrijfGebruikers()
    // {
    //     var bedrijfGebruikers = await _context.Users
    //         .Where(user => user.Rol == "Bedrijf" && user.Status == false)
    //         .ToListAsync();

    //     return bedrijfGebruikers;
    // }

    [HttpGet]
    [Route("GetGebruikers")]
    public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetGebruikers()
    {
        var gebruikers = await _context.Users.ToListAsync();
        return gebruikers;
    }

}