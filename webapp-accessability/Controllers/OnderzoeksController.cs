using Microsoft.AspNetCore.Mvc;
using webapp_accessability.Data;

[Route("api/onderzoek")]
[ApiController]
public class OnderzoeksController : ControllerBase
{

    private readonly CrudOnderzoekService _onderzoekService;
     public OnderzoeksController(CrudOnderzoekService onderzoekService)
    {
        _onderzoekService = onderzoekService;
    }

    

}