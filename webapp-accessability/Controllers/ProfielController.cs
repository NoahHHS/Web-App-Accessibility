using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

   private async Task<ApplicationUser> GetCurrentUser(){
      var user = await _userManager.GetUserAsync(HttpContext.User);
      return user;
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