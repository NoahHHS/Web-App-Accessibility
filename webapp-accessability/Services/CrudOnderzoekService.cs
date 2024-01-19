using webapp_accessability.Data;
using webapp_accessability.Models;
using System.Linq;

public class CrudOnderzoekService : ICrudService<Onderzoek>
{
    //------------------------- Variables -------------------------
    private ApplicationDbContext context;

    //------------------------- Constructor -------------------------
    public CrudOnderzoekService(ApplicationDbContext _context){
        context = _context;
    }

    //------------------------- Methods -------------------------
    public void Create(Onderzoek newOnderzoek)
    {
        bool exists = context.Onderzoeken.Any(o => o.Id == newOnderzoek.Id);
        if(!exists){
            context.Onderzoeken.Add(newOnderzoek);
            context.SaveChanges();
        }
    }

    public Onderzoek Read(string Id)
    {
        var Onderzoek = context.Onderzoeken.FirstOrDefault(O => O.Id.ToString() == Id);
        if (Onderzoek != null){
            return Onderzoek;
        }
        else{
            return null;
        }
    }

    public IEnumerable<Onderzoek> ReadAll()
    {
        return context.Onderzoeken.ToList();    
    }
    public void Update(string Id, Onderzoek UpdatedOnderzoek)
    {
        var Onderzoek = context.Onderzoeken.FirstOrDefault(O => O.Id.ToString() == Id);
        if(Onderzoek != null){
            context.Onderzoeken.Update(UpdatedOnderzoek);
            context.SaveChanges();
        }
    }

    public void Delete(string Id)
    {
        var Onderzoek = context.Onderzoeken.FirstOrDefault(O => O.Id.ToString() == Id);
        if(Onderzoek != null){
            context.Onderzoeken.Remove(Onderzoek);
            context.SaveChanges();
        }
    }
}