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
                var token = Request.Cookies["AuthCookie"];
                if (!string.IsNullOrEmpty(token))
                {
                    return Ok(token);
                }
            }
            return Unauthorized();
        }
    }
}
