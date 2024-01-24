using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
using webapp_accessability.Controllers;
using webapp_accessability.Models;
using Xunit;

namespace webapp_accessability.Tests
{
public class LoginControllerTests
{
    private readonly Mock<UserManager<ApplicationUser>> mockUserManager;
    private readonly Mock<IConfiguration> mockConfiguration;

    public LoginControllerTests()
    {
        // Initialize the mockUserManager with necessary dependencies
        mockUserManager = new Mock<UserManager<ApplicationUser>>(
            Mock.Of<IUserStore<ApplicationUser>>(), 
            null, null, null, null, null, null, null, null);

        // Mock Configuration to provide JWT secret key
        mockConfiguration = new Mock<IConfiguration>();
        mockConfiguration.Setup(c => c["JwtSecretKey"]).Returns("your_very_long_and_random_secret_key");

        // Mock the FindByEmailAsync method to return a valid user for a specific email
        mockUserManager.Setup(x => x.FindByEmailAsync("valid@example.com"))
            .ReturnsAsync(new ApplicationUser { Email = "valid@example.com" });

        // Mock the CheckPasswordAsync method to return true for a specific password
        mockUserManager.Setup(x => x.CheckPasswordAsync(It.IsAny<ApplicationUser>(), "validpassword"))
            .ReturnsAsync(true);

        // Setup mock responses for roles and claims
        mockUserManager.Setup(um => um.GetRolesAsync(It.IsAny<ApplicationUser>()))
            .ReturnsAsync(new List<string> { "Role1", "Role2" });
        mockUserManager.Setup(um => um.GetClaimsAsync(It.IsAny<ApplicationUser>()))
            .ReturnsAsync(new List<Claim>());
    }

    [Fact]
    public async Task Login_ReturnsOkResult_WithValidCredentials()
    {
        // Arrange
        var controller = new LoginController(mockUserManager.Object, mockConfiguration.Object);
        var loginModel = new LoginDTO { Email = "valid@example.com", Wachtwoord = "validpassword" };

        // Act
        var result = await controller.Login(loginModel);

        // Assert
        Assert.IsType<OkObjectResult>(result);
    }

    // Additional tests can be added here
}
}
