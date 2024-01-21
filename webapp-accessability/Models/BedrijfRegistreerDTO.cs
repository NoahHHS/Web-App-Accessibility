namespace webapp_accessability.Models;
// RegistrationModel
public class BedrijfRegistreerDTO
{
    public string Email { get; set; }
    public string Bedrijfsnaam {get; set;}
    public string Postcode {get; set;}
    public string Straatnaam {get; set;}
    public string Huisnummer {get; set;}
    public string Toevoeging {get; set;}
    public string Wachtwoord { get; set; }
    // Additional properties as needed
}