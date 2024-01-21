using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using webapp_accessability.Models;

public class JwtService : IJwtService
{
    private readonly string _secretKey;

    public JwtService(string secretKey)
    {
        _secretKey = secretKey;
    }

    public string GenerateToken(ApplicationUser user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            // Add any additional claims based on your requirements
        };

        var token = new JwtSecurityToken(
            issuer: "https://localhost:7288",
            audience: "https://localhost:44412",
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(10), // Adjust expiration as needed
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
