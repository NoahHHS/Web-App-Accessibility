namespace webapp_accessability.Models;

public class MedischeGegevens {
    public string Beperking {get; set;}
    public string? Hulpmiddelen {get; set;}

    //FK
    public string? UserID {get; set;}
}