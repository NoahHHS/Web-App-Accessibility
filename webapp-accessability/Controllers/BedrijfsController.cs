using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
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
public async Task<ActionResult<Onderzoek>> CreateOnderzoek(OnderzoekCreatieDTO onderzoekDTO)
{
    // Validate the model state
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    // Create OnderzoekLink entity
    var link = new OnderzoekLink
    {   
        Link = onderzoekDTO.Link?.Link // Ensure Link is not null before accessing Link property
    };

    _context.OnderzoekLinks.Add(link);
    await _context.SaveChangesAsync(); // Opslaan om een ID te genereren

    // Create Adres entity
    var adres = new Adres
    {
        Straat = onderzoekDTO.Locatie?.Adres?.Straat,
        HuisNr = onderzoekDTO.Locatie?.Adres?.HuisNr ?? 0,
        Toevoeging = onderzoekDTO.Locatie?.Adres?.Toevoeging,
        Postcode = onderzoekDTO.Locatie?.Adres?.Postcode
    };

    // Create OnderzoekLocatie entity
    var locatie = new OnderzoekLocatie
    {
        Adres = adres
    };

    // Create Onderzoek entity with LinkId now that it's known
    var onderzoek = new Onderzoek
    {
        Naam = onderzoekDTO.Naam,
        Omschrijving = onderzoekDTO.Omschrijving,
        StartDatum = onderzoekDTO.StartDatum,
        // LinkId = link.Id,  // Set the foreign key value
        Locatie = locatie
        // Add other properties as needed
    };

    // Add Onderzoek to context and save changes
    _context.Onderzoeken.Add(onderzoek);
    await _context.SaveChangesAsync();

    return CreatedAtAction("GetOnderzoeken", new { id = onderzoek.Id }, onderzoek);
}
}
