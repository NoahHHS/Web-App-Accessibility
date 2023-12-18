namespace webapp_accessability.Models;

public class Onderzoek {
    public int Id {get; set;}
    public string Naam {get; set;}
    public string? Omschrijving {get; set;}
    public DateOnly StartDatum {get; set;}
    public DateOnly? EindDatum {get; set;}
    public string Status {get; set;}
    public string Locatie {get; set;}

}