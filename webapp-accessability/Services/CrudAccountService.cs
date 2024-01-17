using webapp_accessability.Data;
using webapp_accessability.Models;

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

    public void Update(ApplicationUser obj)
    {
        throw new NotImplementedException();
    }

    public void Delete(string Id)
    {
        
    }
}