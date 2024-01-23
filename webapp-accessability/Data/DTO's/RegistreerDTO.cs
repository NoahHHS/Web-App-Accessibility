using System.ComponentModel.DataAnnotations;

namespace webapp_accessability.Models;
// RegistrationModel
public class RegistreerDTO
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    public string Password { get; set; }

    [Required]
    public string Role { get; set; } // "Admin", "Medewerker", "Ervaringsdeskundige", "Bedrijf"

    // Add additional fields as required
}


