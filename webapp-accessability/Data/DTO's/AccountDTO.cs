namespace webapp_accessability.Models;
// RegistrationModel
public class AccountDTO
{
    public string? Naam { get; set; }
    public string? Email { get; set; }
    public string? BedrijfsNaam { get; set; }
    public DateTime? Beschikbaarheid { get; set; }
    public string Straat { get; set; }
    public int HuisNr { get; set; }
    public string Postcode { get; set; }
}
