using webapp_accessability.Models;

public interface IJwtService
{
    string GenerateJwtToken(ApplicationUser user);
}