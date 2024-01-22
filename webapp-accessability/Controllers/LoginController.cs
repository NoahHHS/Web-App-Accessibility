using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using webapp_accessability.Models;

[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ILogger<LoginController> _logger;
    private readonly IJwtService _jwtService;

    public LoginController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        ILogger<LoginController> logger,
        IJwtService jwtService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _logger = logger;
        _jwtService = jwtService;
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginDTO model)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Ongeldige inloggegevens verstrekt.");
                return BadRequest("Ongeldige inloggegevens");
            }

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                _logger.LogWarning($"Inlogpoging met onbekend e-mailadres: {model.Email}");
                return BadRequest(new { Message = "Onbekend e-mailadres. Wilt u een account aanmaken?" });
            }

            var result = await _signInManager.PasswordSignInAsync(user, model.Wachtwoord, isPersistent: false, lockoutOnFailure: false);
            if (!result.Succeeded)
            {
                if (result.IsLockedOut)
                {
                    _logger.LogWarning("Gebruiker met e-mail {Email} is uitgesloten tot {LockoutEnd}", model.Email, user.LockoutEnd);
                    return BadRequest(new { Message = "Account is uitgesloten. Probeer het later opnieuw." });
                }

                _logger.LogWarning($"Ongeldige inlogpoging voor gebruiker: {user.UserName}");
                return BadRequest(new { Message = "Onjuist wachtwoord." });
            }

            var token = _jwtService.GenerateJwtToken(user);
            Response.Cookies.Append("JWT_access_token", token, new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now.AddMinutes(10),
                SameSite = SameSiteMode.Strict,
                Secure = true
            });

            _logger.LogInformation($"Gebruiker {user.UserName} succesvol ingelogd.");
            return Ok(new { UserId = user.Id, Token = token, Message = "Inloggen geslaagd" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Er is een onverwachte fout opgetreden tijdens het inloggen.");
            return StatusCode(500, "Er is een onverwachte fout opgetreden.");
        }
    }
}
