using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

   //var HardCodedUser = _context.ApplicationUsers.First();
   private async Task<ApplicationUser> GetCurrentUser(){
      var user = await _userManager.GetUserAsync(HttpContext.User);
      
      return user;
   }

   [HttpGet]
   [Route("GetGetProfileData")]
   [ProducesResponseType(typeof(ProfielDTO), 200)]
   public async Task<IActionResult> GetProfileData(){
      var currentUser = await GetCurrentUser();
      if(currentUser == null){
         return NotFound();
      }

      var Adres = _context.Adressen.Single(adres => adres.Id == currentUser.AdresId);
      var ProfileData = _context.ApplicationUsers.Where(user => user.Id == currentUser.Id.ToString())
                                                 .Select(u => new ProfielDTO(){
                                                   Naam = u.Naam,
                                                   Email = u.Email,
                                                   Beschikbaarheid = u.Beschikbaarheid,
                                                   Straat = Adres.Straat,
                                                   HuisNr = Adres.HuisNr,
                                                   Postcode = Adres.Postcode
                                                 })
                                                 .ToList();
      
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

   [HttpPut]
   [Route("UpdateAccount")]
   public async Task<ActionResult> UpdateAccount(String Id, ApplicationUser updatedUser){
      // Find the user in the database
      var user = await _userManager.FindByIdAsync(Id);
      if (user == null)
      {
         return NotFound("User not found");
      }

      // Update user properties
      user.Naam = updatedUser.Naam;
      user.Email = updatedUser.Email;
      user.Beschikbaarheid = updatedUser.Beschikbaarheid;
      user.Adres = updatedUser.Adres;
      user.Medischegegevens = updatedUser.Medischegegevens;

      // Update the user in the database
      var result = await _userManager.UpdateAsync(user);
      if (result.Succeeded)
         {
            return Ok("Account updated successfully");
         }
      else
         {
            return BadRequest("Failed to update account");
         }
   }
}