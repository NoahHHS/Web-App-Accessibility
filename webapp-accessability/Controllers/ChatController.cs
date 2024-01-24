// using Microsoft.AspNetCore.Mvc;
// using webapp_accessability.Data;
// using webapp_accessability.Models;

// [ApiController]
// [Route("[controller]")]
// public class ChatController : ControllerBase {

//     private ApplicationDbContext context;
//     public ChatController(ApplicationDbContext _c) {
//         this.context = _c;
//     }

//     [HttpGet] // geeft message terug
//     public IActionResult Get(string Id) {
//         int IId = Int32.Parse(Id);

//         return Ok(context.Chats.Where(ch => ch._to == IId).FirstOrDefault().message);
//     }

//     // [HttpPost]  stuurt bericht door naar DB
//     // public IActionResult PostMessage(Chat chat) {
        
//     // }
// }