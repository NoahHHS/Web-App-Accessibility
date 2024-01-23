using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using webapp_accessability.Models;

public class JwtService : IJwtService
{


    public string GenerateJwtToken(ApplicationUser user)
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
                Expires = DateTime.Now.AddMinutes(10), // expiration time controls how long the JWT token is valid on the server side.
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}

