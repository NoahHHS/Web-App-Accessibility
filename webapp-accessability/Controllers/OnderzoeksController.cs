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
    
    [Route("api/onderzoeksNaamEnBeschrijving")]
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
    
    [Route("api/onderzoeksNaam")]
    public IActionResult GetNaam(string Id)
    {
        var Onderzoek = context.Onderzoeken.FirstOrDefault(O => O.Id.ToString() == Id);
        var result = context.Onderzoeken.Select(O => new 
        {
            Naam = O.Naam
        }).ToList();

        return Ok(result);

    }
    [HttpPost]
    [Route("api/onderzoeksDeelnemer")]
    public IActionResult Deelnemen([FromBody]Deelname deelname)
    {
        if (ModelState.IsValid)
        {
            // Maak een nieuw Onderzoek-object met de ontvangen gegevens
            var nieuweDeelname = new Deelname
            {
                ApplicationUserId = deelname.ApplicationUserId,
                OnderzoekId = deelname.OnderzoekId  
                // Vul andere velden in zoals gewenst
            };
            _onderzoekService.AddDeelnemer(nieuweDeelname);
}
    return Ok("Deelname succesvol");
    
    }
    }

