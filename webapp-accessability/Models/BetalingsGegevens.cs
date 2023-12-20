using Microsoft.AspNetCore.Identity;

namespace webapp_accessability.Models;

// Model voor betalingsgegevens
public class Betalingsgegevens
{
    public int Id { get; set; }
    public string Iban { get; set; }
    public double Salaris { get; set; }

    // Foreign keys
    // Naar ApplicationUser
    public string? ApplicationUserId { get; set; }
    public ApplicationUser ApplicationUser { get; set; }
}