using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using webapp_accessability.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace webapp_accessability.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistreerController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RegistreerController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RegistreerAdminAndMedewerker([FromBody] RegistreerDTO registreer)
        {
            return await Register(registreer);
        }

        [HttpPost("self")]
        public async Task<IActionResult> RegisterSelf([FromBody] RegistreerDTO registreer)
        {
            if (!new[] { "Ervaringsdeskundige", "Bedrijf" }.Contains(registreer.Role))
            {
                return BadRequest("Invalid role for self-registration.");
            }

            return await Register(registreer);
        }

        private async Task<IActionResult> Register(RegistreerDTO registreer)
        {
            var user = new ApplicationUser 
            { 
                UserName = registreer.Email, 
                Email = registreer.Email
            };
            
            var result = await _userManager.CreateAsync(user, registreer.Password);

            if (result.Succeeded)
            {
                if (!await _roleManager.RoleExistsAsync(registreer.Role))
                {
                    return BadRequest($"Role '{registreer.Role}' does not exist.");
                }

                await _userManager.AddToRoleAsync(user, registreer.Role);
                return Ok(new { message = "User registered successfully" });
            }

            return BadRequest(result.Errors);
        }
    }
}
