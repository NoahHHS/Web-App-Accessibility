using System.Collections.ObjectModel;

namespace webapp_accessability.Models;

public class OnderzoekDTO 
{
    public string naam {get; set;}
    public string Beschrijving {get; set;}

    public Collection<Deelname> deelnames {get; set;}
}