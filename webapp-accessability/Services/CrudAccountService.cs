using webapp_accessability.Data;
using webapp_accessability.Models;
using System.Linq;

public class CrudAccountService : ICrudService<ApplicationUser>
{
    private ApplicationDbContext context;

    public CrudAccountService(ApplicationDbContext _context){
        context = _context;
    }

    public void Create(ApplicationUser newUser)
    {
        context.ApplicationUsers.Add(newUser);
        context.SaveChanges();
        Console.WriteLine("User created. Name: " + newUser.Naam);
    }

    public void Read(string Id)
    {
        throw new NotImplementedException();
    }

    public void Update(string id, ApplicationUser obj)
    {
        
    }

    public void Delete(string Id)
    {
        var data = context.ApplicationUsers.FirstOrDefault(User => User.Id == Id);
        if(data != null){
            context.ApplicationUsers.Remove(data);
            context.SaveChanges();
            Console.WriteLine("User Deleted. Name: " + data.Naam);
        }
    }
}