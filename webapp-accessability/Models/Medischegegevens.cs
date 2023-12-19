using Microsoft.AspNetCore.Identity;

namespace webapp_accessability.Models;

// Model voor medische gegevens
public class Medischegegevens
{
    public int Id { get; set; }
    public string Beperking { get; set; }
    public string Hulpmiddelen { get; set; }

    // Foreign keys
    // Naar ApplicationUser
    public int? ApplicationUserId { get; set; }
    public ApplicationUser ApplicationUser { get; set; }
}