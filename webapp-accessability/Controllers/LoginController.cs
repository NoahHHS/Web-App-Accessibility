using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using webapp_accessability.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace webapp_accessability.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public LoginController(UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginDTO loginModel)
    {
        var user = await _userManager.FindByEmailAsync(loginModel.Email);
        if (user != null && await _userManager.CheckPasswordAsync(user, loginModel.Wachtwoord))
        {
            var token = await GenerateJwtToken(user); // Updated to async
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now.AddMinutes(10)
            };
            Response.Cookies.Append("AuthCookie", token, cookieOptions);
            return Ok(new { message = "Success" });
        }
        return Unauthorized();
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
