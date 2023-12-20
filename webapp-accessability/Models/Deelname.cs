using Microsoft.AspNetCore.Identity;

namespace webapp_accessability.Models;

// Model voor deelname aan onderzoeken
public class Deelname
{
    public int Id { get; set; }
    public DateTime Datum { get; set; }

    // Foreign keys
    public string ApplicationUserId { get; set; }
    public ApplicationUser Account { get; set; }

    public int OnderzoekId { get; set; }
    public Onderzoek Onderzoek { get; set; }
}