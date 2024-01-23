using Microsoft.AspNetCore.Mvc;


namespace webapp_accessability.Controllers
{
    [ApiController]
    [Route("authenticatie")]
    public class AuthController : ControllerBase
    {
        [HttpGet("check")]
        public IActionResult CheckAuth()
        {
            if (User.Identity.IsAuthenticated)
            {
                return Ok();
            }
            return Unauthorized();
        }
    }
}