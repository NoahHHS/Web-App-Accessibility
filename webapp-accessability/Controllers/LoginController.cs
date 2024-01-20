using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.V4.Pages.Account.Internal;
using Microsoft.AspNetCore.Mvc;
using webapp_accessability.Data;
using webapp_accessability.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace webapp_accessability.Controllers;

// Login object wat mee gestuurd wordt met de post om in te loggen
public class LoginViewModel
{
    public string Email { get; set; }
    public string Password { get; set; }
}


[Authorize]
[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    UserManager<ApplicationUser> _userManager;
    ApplicationDbContext _context;

    public LoginController(UserManager<ApplicationUser> u, ApplicationDbContext context)
    {
        _userManager = u;
        _context = context;
    }


//Verifying Passwords:
//When a user tries to log in, you use SignInManager.PasswordSignInAsync to verify the provided password.
//The SignInManager takes care of comparing the provided password with the hashed password stored in the database.
    [HttpPost]
    public async Task<ActionResult> Login([FromBody]LoginViewModel loginViewModel) {
        var user = await _userManager.FindByEmailAsync(loginViewModel.Email);
        if(user == null)
        {
            return BadRequest("Gebruiker niet gevonden");
        }

        // Checkt wachtwoord
        var passwordValid = await _userManager.CheckPasswordAsync(user, loginViewModel.Password);
        if(!passwordValid) {
            return BadRequest("Ongeldig wachtwoord");
        }

        // Hierna is de gebruiker authenticated
        // Genereer en set JWT token

        var token = GenerateJwtToken(user);

        return Ok(new { Token = token});

    }

    // Method to generate a JWT token
    private string GenerateJwtToken(ApplicationUser user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("asdaaweae_131_12351341@123123"); // your_secret_key

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.Id),
                // Add other claims as needed
            }),
            Expires = DateTime.Now.AddMinutes(10), // Token expiration time
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
