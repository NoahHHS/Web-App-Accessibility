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

    public LoginController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        ILogger<LoginController> logger)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _logger = logger;
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

            // Log the actual password provided during the login attempt
            _logger.LogError(" WILL SAY FAIL BUT IT SUCCEEDED\nPassword provided for user with email {Email}: {ProvidedPassword}", model.Email, model.Password);

            var result = await _signInManager.PasswordSignInAsync(user, model.Password, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                // User successfully logged in
                var token = GenerateJwtToken(user);

                // Log success or additional information
                _logger.LogInformation($"User {user.UserName} signed in successfully.");

                return Ok(new { UserId = user.Id, Token = token, Message = "Login successful" });
                //return Ok(new { UserId = user.Id, Message = "Login successful" });
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
            _logger.LogError("Invalid login attempt for user with email: {Email}", model.Email);

            return BadRequest(new { Message = "Invalid login attempt" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred during login.");
            return StatusCode(500, "An unexpected error occurred.");
        }
    }

    // Method to generate a JWT token
    private string GenerateJwtToken(ApplicationUser user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        
        // Use RandomNumberGenerator to generate a random key
        using (var randomNumberGenerator = RandomNumberGenerator.Create())
        {
            var keyBytes = new byte[32]; // 32 bytes for a 256-bit key
            randomNumberGenerator.GetBytes(keyBytes);
            var base64Key = Convert.ToBase64String(keyBytes);

            var key = Encoding.ASCII.GetBytes(base64Key);

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
}
