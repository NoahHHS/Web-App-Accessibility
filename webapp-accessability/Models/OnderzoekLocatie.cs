using Microsoft.AspNetCore.Identity;

namespace webapp_accessability.Models;

// Model voor onderzoekslocaties
public class OnderzoekLocatie : OnderzoekComponent
{

    // Adresgegevens als onderdeel van onderzoeklocatie
    public Adres Adres { get; set; }
}