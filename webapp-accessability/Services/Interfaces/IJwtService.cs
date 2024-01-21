using webapp_accessability.Models;

public interface IJwtService
{
    string GenerateToken(ApplicationUser user);
}