using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using webapp_accessability.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace webapp_accessability.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistreerController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

    public RegistreerController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpPost("admin")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RegistreerAdminAndMedewerker([FromBody] RegistreerDTO registreer)
        {
            return await Register(registreer);
        }

        [HttpPost("gebruiker")]
        public async Task<IActionResult> RegisterSelf([FromBody] RegistreerDTO registreer)
        {
            if (!new[] { "Ervaringsdeskundige", "Bedrijf" }.Contains(registreer.Rol))
            {
                return BadRequest("Invalid role for self-registration.");
            }

            return await Register(registreer);
        }

        private async Task<IActionResult> Register(RegistreerDTO registreer)
        {
            Console.WriteLine($"Received data: {registreer.Email}, {registreer.Rol}, {registreer.Postcode}"); // Log the received data
            var adres = new Adres
            {
                Straat = registreer.Straat,
                HuisNr = registreer.HuisNr,
                Toevoeging = registreer.Toevoeging,
                Postcode = registreer.Postcode
            };

            var user = new ApplicationUser 
            { 
                UserName = registreer.Email, 
                Email = registreer.Email,
                Adres = adres, // Assuming direct assignment is handled by your ORM
                Rol = registreer.Rol
            };
            
            var result = await _userManager.CreateAsync(user, registreer.Wachtwoord);

            if (result.Succeeded)
            {
                if (!await _roleManager.RoleExistsAsync(registreer.Rol))
                {
                    return BadRequest($"Rol '{registreer.Rol}' bestaat niet.");
                }

                await _userManager.AddToRoleAsync(user, registreer.Rol);

                // Generate JWT token for the newly registered user
                var token = await GenerateJwtToken(user);
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Expires = DateTime.Now.AddMinutes(10)
                };
                Response.Cookies.Append("AuthCookie", token, cookieOptions);

                return Ok(new { message = "Gebruiker succesvol geregistreerd" });
            }

            return BadRequest(result.Errors);
        }




        private async Task<string> GenerateJwtToken(ApplicationUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);

            var roleClaims = roles.Select(r => new Claim(ClaimTypes.Role, r)).ToList();

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            }
            .Union(userClaims)
            .Union(roleClaims);

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSecretKey"]));

            var token = new JwtSecurityToken(
                expires: DateTime.Now.AddMinutes(10),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
