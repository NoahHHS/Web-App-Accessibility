using System.CodeDom;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using SQLitePCL;
using webapp_accessability.Data;
using webapp_accessability.Models;

namespace webapp_accessability.Controllers;

[ApiController]
[Route("[controller]")]
public class ProfielController : ControllerBase
{
   private readonly ApplicationDbContext _context;
   private readonly UserManager<ApplicationUser> _userManager;
   
   public ProfielController(
      ApplicationDbContext context,
      UserManager<ApplicationUser> userManager
   ){
      _context = context;
      _userManager = userManager;
   }


   //-------------------------------------------- HTTP GET Methods --------------------------------------------
   [HttpGet]
   [Route("GetProfileData")]
   [ProducesResponseType(typeof(ProfielDTO), 200)]
   public async Task<IActionResult> GetProfileData(){
      var currentUser = await GetCurrentUser();
      if(currentUser == null){
         return NotFound();
      }

      var Adres = _context.Adressen.FirstOrDefault(adres => adres.Id == currentUser.AdresId);
      if(Adres == null){
         Adres = new Adres(){
            Straat = "",
            HuisNr = 0,
            Postcode = ""
         };
      }
      var ProfileData = _context.ApplicationUsers.Where(user => user.Id == currentUser.Id.ToString())
                                                 .Select(u => new ProfielDTO(){
                                                   Naam = u.Naam,
                                                   Email = u.Email,
                                                   Beschikbaarheid = u.Beschikbaarheid,
                                                   Straat = Adres.Straat,
                                                   HuisNr = Adres.HuisNr,
                                                   Postcode = Adres.Postcode
                                                 })
                                                 .FirstOrDefault();
      
      if(ProfileData == null){
         return NotFound();
      }
      else{
         return Ok(ProfileData);
      }

   }

   [HttpGet]
   [Route("GetMedischeGegevens")]
   public async Task<IQueryable<MedischDTO>> GetMedischeGegevens(){
      var currentUser = await GetCurrentUser();
      var MedischeData = from M in _context.Medischegegevens.Where(m => m.ApplicationUserId == currentUser.Id)
                         select new MedischDTO()
                         {
                           Beperking = M.Beperking,
                           Hulpmiddelen = M.Hulpmiddelen
                         };
      return MedischeData;
   }

   //-------------------------------------------- HTTP POST Methods --------------------------------------------
   [HttpPost]
   [Route("MaakMedischeGegeven")]
   public async Task<IActionResult> MaakMedischeGegevenAsync(string _Beperking, string _Hulpmiddelen){
      var currentUser = await GetCurrentUser();
      if(_context.Medischegegevens.Any(m => (m.ApplicationUserId == currentUser.Id) && (m.Hulpmiddelen == _Hulpmiddelen) && (m.Beperking == _Beperking))){
         return BadRequest("Aandoening al toegevoegd");
      }

      _context.Medischegegevens.Add(new Medischegegevens{
         Beperking = _Beperking,
         Hulpmiddelen = _Hulpmiddelen,
         ApplicationUserId = currentUser.Id
      });
      _context.SaveChanges();
      return Ok();
   }

   //-------------------------------------------- HTTP PUT Methods --------------------------------------------
   [HttpDelete]
   [Route("DeleteMedischeGegeven")]
   public async Task<IActionResult> DeleteMedischeGegevenAsync(string _Beperking, string _Hulpmiddelen){
      var currentUser = await GetCurrentUser();
      var MedischeGegeven = _context.Medischegegevens.FirstOrDefault(M => (M.ApplicationUserId == currentUser.Id) && (M.Hulpmiddelen == _Hulpmiddelen) && (M.Beperking == _Beperking));
      if(MedischeGegeven == null){
         return BadRequest("Medischegegevens niet verwijderd. Item niet gevonden in database");
      }
      else{
         _context.Medischegegevens.Remove(MedischeGegeven);
         _context.SaveChanges();
         return Ok("Medischegegevens verwijderd");
      }
   }

   //-------------------------------------------- HTTP PUT Methods --------------------------------------------
   [HttpPut]
   [Route("UpdateAccount")]
   public async Task<ActionResult> UpdateAccount(ProfielDTO updatedUserData)
   {
      var currentUser = await GetCurrentUser();

      // Find the user in the database
      var user = await _userManager.FindByIdAsync(currentUser.Id);
      if (user == null)
      {
         return BadRequest(new { error = "Account not found" });
      }

      // Update address and user
      bool addressUpdated = UpdateAdres(user, updatedUserData);

      // Update user properties
      user.Naam = updatedUserData.Naam;
      user.Email = updatedUserData.Email;
      user.Beschikbaarheid = updatedUserData.Beschikbaarheid;

      // Update the user in the database
      var result = await _userManager.UpdateAsync(user);
      if (result.Succeeded && addressUpdated)
      {
         return Ok(new { message = "Account updated successfully" });
      }
      if (result.Succeeded && !addressUpdated)
      {
         return BadRequest(new { error = "Failed to update Address" });
      }
      else
      {
         return BadRequest(new { error = "Failed to update account" });
      }
   }

   //-------------------------------------------- Functional Methods --------------------------------------------
   private bool UpdateAdres(ApplicationUser user, ProfielDTO updatedUserData){
      bool exist = _context.Adressen.Any(A => (A.Straat == updatedUserData.Straat) && (A.HuisNr == updatedUserData.HuisNr) && (A.Postcode == updatedUserData.Postcode));

      if (!exist){
         Adres UpdatedAdres = new Adres(){
               Straat = updatedUserData.Straat,
               HuisNr = updatedUserData.HuisNr,
               Postcode = updatedUserData.Postcode,
               Toevoeging = updatedUserData.Toevoeging
         };

         _context.Adressen.Add(UpdatedAdres);
         _context.SaveChanges();
         user.AdresId = UpdatedAdres.Id;
         return true;
      }

      if (exist && user.AdresId == null){
         var adres = _context.Adressen.First(A => (A.Straat == updatedUserData.Straat) && (A.HuisNr == updatedUserData.HuisNr) && (A.Postcode == updatedUserData.Postcode));
         user.AdresId = adres.Id;
         return true;
      }

      if (exist && user.AdresId != null){
         var adres = _context.Adressen.FirstOrDefault(A => A.Id == user.AdresId);

         if (adres == null){
               adres = _context.Adressen.First(A => (A.Straat == updatedUserData.Straat) && (A.HuisNr == updatedUserData.HuisNr) && (A.Postcode == updatedUserData.Postcode));
         }
         else{
               adres.Straat = updatedUserData.Straat;
               adres.Postcode = updatedUserData.Postcode;
               adres.HuisNr = updatedUserData.HuisNr;
               adres.Toevoeging = updatedUserData.Toevoeging;
         }

         _context.Adressen.Update(adres);
         _context.SaveChanges();
         user.AdresId = adres.Id;
         return true;
      }

      return false;
   }

   //var HardCodedUser = _context.ApplicationUsers.First();
   private async Task<ApplicationUser> GetCurrentUser(){
      //var user = await _userManager.GetUserAsync(HttpContext.User);
      var user = _context.ApplicationUsers.First(u => u.Email == "ruben@test.nl");
      return user;
   }
}