using Microsoft.AspNetCore.Identity;

namespace webapp_accessability.Models;

// Account model met IdentityUser als basis
public class ApplicationUser : IdentityUser
{
    public string? Naam { get; set; }
    public string? Token { get; set; }
    public string? Rol { get; set; }
    public string? BedrijfsNaam { get; set; }
    public string? VoorkeurBenadering { get; set; }
    public DateTime? Beschikbaarheid { get; set; }

    // Foreign keys
    // Naar adresgegevens
    public int? AdresId { get; set; }
    public Adres? Adres { get; set; }

    // Navigatie-eigenschap voor Medischegegevens
    public ICollection<Medischegegevens>? Medischegegevens { get; set; }

    // Navigatie-eigenschap voor Deelnames
    public ICollection<Deelname>? Deelnames { get; set; }

    // Navigatie-eigenschap voor Onderzoek (1-op-1)
    public Onderzoek? Onderzoek { get; set; }

}
