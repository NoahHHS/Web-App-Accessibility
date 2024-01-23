using System.ComponentModel.DataAnnotations;

namespace webapp_accessability.Models;

public class RegistreerDTO
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "Het {0} moet ten minste {2} en maximaal {1} tekens lang zijn.", MinimumLength = 6)]
    public string Wachtwoord { get; set; }

    [Required]
    public string Rol { get; set; }

    [Required]
    public string Straat { get; set; }

    [Required]
    public int HuisNr { get; set; }

    public string Toevoeging { get; set; }

    [Required]
    public string Postcode { get; set; }
}
