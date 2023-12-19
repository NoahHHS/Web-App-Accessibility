using Microsoft.AspNetCore.Identity;

namespace webapp_accessability.Models;

// Account model met IdentityUser als basis
public class ApplicationUser : IdentityUser
{
    public string Naam { get; set; }
    public string Token { get; set; }
    public string Rol { get; set; }
    public string BedrijfsNaam { get; set; }
    public string VoorkeurBenadering { get; set; }
    public DateTime Beschikbaarheid { get; set; }

    // Foreign keys
    // Naar adresgegevens
    public int AdresId { get; set; }
    public Adres Adres { get; set; }
}