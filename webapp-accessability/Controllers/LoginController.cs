using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using webapp_accessability.Models;
using System.Security.Cryptography;

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
                return BadRequest("Invalid login data");
            }

            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                _logger.LogError("Invalid login attempt for user with email: {Email}", model.Email);
                return BadRequest(new { Message = "Invalid login attempt" });
            }

            var result = await _signInManager.PasswordSignInAsync(user, model.Wachtwoord, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                // User successfully logged in
                var token = _jwtService.GenerateJwtToken(user);

                // Attach the token to the response as a cookie
                Response.Cookies.Append("access_token", token, new CookieOptions
                {
                    HttpOnly = true,
                    Expires = DateTime.Now.AddMinutes(10), // expiration time controls how long the browser should retain the cookie containing the JWT token.
                    SameSite = SameSiteMode.Strict,
                    Secure = true // Use 'Secure' only if your application is served over HTTPS
                });

                return Ok(new { UserId = user.Id, Token = token, Message = "Login successful" });
            }
            else
            {
                // Log failure or additional information
                _logger.LogWarning($"User {user.UserName} sign-in failed. Result: {result}, IsNotAllowed: {result.IsNotAllowed}, RequiresTwoFactor: {result.RequiresTwoFactor}, IsLockedOut: {result.IsLockedOut}, LockoutEnd: {user.LockoutEnd}");


            }

            // Check if the lockout policy is affecting the login attempts
            if (result.IsLockedOut)
            {
                _logger.LogWarning("User with email {Email} is locked out until {LockoutEnd}", model.Email, user.LockoutEnd);
                return BadRequest(new { Message = "Account is locked out. Please try again later." });
            }

            // Log failure or additional information
            // _logger.LogError("Invalid login attempt for user with email: {Email}", model.Email);

            return BadRequest(new { Message = "Invalid login attempt" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred during login.");
            return StatusCode(500, "An unexpected error occurred.");
        }
    }
}
