using Microsoft.AspNetCore.Identity;

namespace webapp_accessability.Models;

public class ApplicationUser : IdentityUser
{
    public string? Email;
    public string? Wachtwoord;
    public string? Naam;
    public int? Telnr;
    public string? Token;
    public string? Functie;
    public string? Bedrijfsnaam;
    public int? bedrijfsTelNr;
    public string? VoorkeurBenadering;
    public int? AangemeldPromos;
    public string? Beschikbaarheid;
}
