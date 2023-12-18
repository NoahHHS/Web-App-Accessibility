namespace webapp_accessability.Models;

public class Betalingsgegevens : ApplicationUser {
    public string IBAN {get; set;}
    public int? Salaris {get; set;}
}