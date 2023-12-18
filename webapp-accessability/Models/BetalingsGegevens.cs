namespace webapp_accessability.Models;

public class Betalingsgegevens : ApplicationUser {
    public int Id {get; set;}
    public string? IBAN {get; set;}
    public int? Salaris {get; set;}
}