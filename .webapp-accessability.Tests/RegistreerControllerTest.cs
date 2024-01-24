using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using webapp_accessability.Models;
using webapp_accessability.Controllers;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;

public class RegistreerControllerTests
{
    [Fact]
    public async Task RegisterSelf_ReturnsOkResult_WithValidData()
    {
        // Arrange
        var userManagerMock = new Mock<UserManager<ApplicationUser>>(
            Mock.Of<IUserStore<ApplicationUser>>(), null, null, null, null, null, null, null, null);

        var roleManagerMock = new Mock<RoleManager<IdentityRole>>(
            Mock.Of<IRoleStore<IdentityRole>>(), null, null, null, null);

        var configurationMock = new Mock<IConfiguration>();

        userManagerMock.Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success);
        roleManagerMock.Setup(x => x.RoleExistsAsync(It.IsAny<string>())).ReturnsAsync(true);
        userManagerMock.Setup(x => x.AddToRoleAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success);

        // Mock GetClaimsAsync and GetRolesAsync to return non-null values
        userManagerMock.Setup(u => u.GetClaimsAsync(It.IsAny<ApplicationUser>())).ReturnsAsync(new List<Claim>());
        userManagerMock.Setup(u => u.GetRolesAsync(It.IsAny<ApplicationUser>())).ReturnsAsync(new List<string>());

        var controller = new RegistreerController(userManagerMock.Object, roleManagerMock.Object, configurationMock.Object);

        // Act
        var result = await controller.RegisterSelf(new RegistreerDTO { Email = "newuser@example.com", Wachtwoord = "Password123", Rol = "Ervaringsdeskundige" });

        // Assert
        Assert.IsType<OkObjectResult>(result);
    }
}
