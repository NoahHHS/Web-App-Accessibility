using Microsoft.AspNetCore.Mvc;
using webapp_accessability.Data;
using webapp_accessability.Models;

[Route("api/onderzoek")]
[ApiController]
public class OnderzoeksController : ControllerBase
{
    private ApplicationDbContext context;
    private readonly CrudOnderzoekService _onderzoekService;
     public OnderzoeksController(CrudOnderzoekService onderzoekService)
    {
        _onderzoekService = onderzoekService;
    }

    public IActionResult GetNaamEnBeschrijving()
    {

        var onderzoeken = _onderzoekService.ReadAll();

        var result = onderzoeken.Select(o => new
        {
            Naam = o.Naam,
            Beschrijving = o.Omschrijving

        }).ToList();

        return Ok(result);
    }
}
