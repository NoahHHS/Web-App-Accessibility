using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace webapp_accessability.Controllers
{
    [ApiController]
    [Route("authenticatie")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;

        public AuthController(ILogger<AuthController> logger)
        {
            _logger = logger;
        }

        [HttpGet("JWTcheck")]
        public IActionResult CheckAuth()
        {
            if (User.Identity.IsAuthenticated)
            {
                _logger.LogInformation("User is authenticated.");
                return Ok();
            }
            _logger.LogWarning("User is not authenticated.");
            return Unauthorized();
        }
    }
}
