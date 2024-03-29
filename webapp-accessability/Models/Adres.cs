using Microsoft.AspNetCore.Identity;

namespace webapp_accessability.Models;

// Model voor adresgegevens
public class Adres
{
    public int Id { get; set; }
    public string Straat { get; set; }
    public int HuisNr { get; set; }
    public string? Toevoeging { get; set; }
    public string Postcode { get; set; }
}