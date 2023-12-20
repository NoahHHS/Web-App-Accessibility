using Microsoft.AspNetCore.Identity;

namespace webapp_accessability.Models;

public abstract class OnderzoekComponent
{
    public int Id { get; set; }
    // Gemeenschappelijke eigenschappen voor OnderzoekLink en OnderzoekLocatie
}