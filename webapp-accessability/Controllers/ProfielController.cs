using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace webapp_accessability.Controllers;

// [Authorize]
[ApiController]
[Route("[controller]")]
public class ProfielController : ControllerBase
{
   private CrudAccountService AccountCRUD = new CrudAccountService(null);


}