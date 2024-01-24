using Microsoft.AspNetCore.Identity;

namespace webapp_accessability.Models;

// Model voor onderzoeken
public class Onderzoek
{
    public int Id { get; set; }
    public string Naam { get; set; }
    public string Omschrijving { get; set; }
    public DateTime StartDatum { get; set; }
    public DateTime EindDatum { get; set; }
    public bool Status { get; set; }
    public string Type { get; set; }

    // Foreign keys
    public string MedewerkerId { get; set; }
    public ApplicationUser Medewerker { get; set; }

    public int? LinkId { get; set; }
    public OnderzoekLink Link { get; set; }

    public int? LocatieId { get; set; }
    public OnderzoekLocatie Locatie { get; set; }

    // Navigatie-eigenschap voor Deelnames
    public ICollection<Deelname> Deelnames { get; set; }

    public int? OnderzoekComponentId { get; set; }
    public OnderzoekComponent OnderzoekComponent { get; set; }

    // Nieuwe foreign key voor ApplicationUser (Bedrijf)
    public string BedrijfId { get; set; }
    public ApplicationUser Bedrijf { get; set; }
}