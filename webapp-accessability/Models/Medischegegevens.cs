using Microsoft.AspNetCore.Identity;

namespace webapp_accessability.Models;

public class Medischegegevens
{
    public int Id { get; set; }
    public string Beperking { get; set; }
    public string Hulpmiddelen { get; set; }

    // Foreign keys
    // Naar ApplicationUser
    public string? ApplicationUserId { get; set; }
    public ApplicationUser ApplicationUser { get; set; }
}