namespace webapp_accessability.Models;
// RegistrationModel
public class ProfielDTO
{
    public string? Naam { get; set; }
    public string? Email { get; set; }
    public DateTime? Beschikbaarheid { get; set; }
    public string Straat { get; set; }
    public int HuisNr { get; set; }
    public string Postcode { get; set; }
}
