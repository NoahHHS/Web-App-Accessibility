using Microsoft.AspNetCore.Mvc;
using webapp_accessability.Data;
using webapp_accessability.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

[ApiController]
[Route("[controller]")]
public class OnderzoeksController : ControllerBase
{
    private ApplicationDbContext context;
    private readonly CrudOnderzoekService _onderzoekService;
    
    private readonly UserManager<ApplicationUser> _userManager;
    public OnderzoeksController(ApplicationDbContext DBcontext, UserManager<ApplicationUser> userManager)
    {
        context = DBcontext;
        _onderzoekService = new CrudOnderzoekService(context);
        _userManager = userManager;
    }
    
    private async Task<ApplicationUser> GetCurrentUser(){
      var user = await _userManager.GetUserAsync(HttpContext.User);
      var HardCodedUser = context.ApplicationUsers.First();
      return user;
   }

    [HttpGet("GetNaamenBeschrijving")]
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

    [HttpGet("GetOnderzoeken")]
    public IActionResult GetOnderzoeken() {
        OnderzoekDTO[] DTO;

        return Ok(context.Onderzoeken.Select(oz => new OnderzoekDTO{Id = oz.Id, Beschrijving = oz.Omschrijving, naam = oz.Naam}).ToList());
    }
    
    [HttpGet("GetNaam")]
    public IActionResult GetNaam(string Id)
    {
        var Onderzoek = context.Onderzoeken.FirstOrDefault(O => O.Id.ToString() == Id);
        var result = context.Onderzoeken.Where(oz => oz.Id.ToString() == Id).Select(O => new 
        {
            Naam = O.Naam
        }).ToList();

        return Ok(result);

    }
    [HttpPost("Deelnemen")]
    public IActionResult Deelnemen([FromBody] DeelnameDTO deelnameDTO)
    {
     if (ModelState.IsValid && deelnameDTO.OnderzoeksId.All(char.IsDigit))
        {
            var deelname = new Deelname
            {
                ApplicationUserId = deelnameDTO.UserId,
                OnderzoekId = Int32.Parse(deelnameDTO.OnderzoeksId)
            };

            context.Deelnames.Add(deelname);
            context.SaveChanges();

            return Ok("Deelname toegevoegd");
        }

        return BadRequest("Ongeldige invoergegevens");
    }
    }

