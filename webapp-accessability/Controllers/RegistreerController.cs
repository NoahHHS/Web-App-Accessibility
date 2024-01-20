using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using webapp_accessability.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class RegistrationController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _applicationUser;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ILogger<RegistrationController> _logger;

    public RegistrationController(
        UserManager<ApplicationUser> userManager, 
        SignInManager<ApplicationUser> signInManager,
        ILogger<RegistrationController> logger)
    {
        _applicationUser = userManager;
        _signInManager = signInManager;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegistratieModel model)
    {
        if (ModelState.IsValid)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                // Set other properties as needed
            };

            var result = await _applicationUser.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // Customize as needed - here we're signing in the user after successful registration
                await _signInManager.SignInAsync(user, isPersistent: false);

                // You can generate and return a JWT token if needed
                //var token = GenerateJwtToken(user);

                return Ok(new { UserId = user.Id, Message = "Registratie successvol" });
            }
            else
            {
                _logger.LogError($"User registration failed. Errors: {string.Join(", ", result.Errors)}");
                // Registration failed, handle errors
                //return BadRequest(result.Errors);
                return BadRequest(new { Message = "User registration failed", Errors = result.Errors.Select(error => error.Description) });
            }
        }

        // Invalid registration data, handle accordingly
        return BadRequest("Invalid registration data");
    }

        // Method to generate a JWT token
    private string GenerateJwtToken(ApplicationUser user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("asdaaweae_131_12351341@123123456789012345678901234567890"); // your_secret_key

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
