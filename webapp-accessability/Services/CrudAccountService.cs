using webapp_accessability.Data;
using webapp_accessability.Models;
using System.Linq;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

public class CrudAccountService : ICrudService<ApplicationUser>
{
    //------------------------- Variables -------------------------
    private ApplicationDbContext context;

    //------------------------- Constructor -------------------------
    public CrudAccountService(ApplicationDbContext _context){
        context = _context;
    }

    //------------------------- Methods -------------------------
    // CRUD methods for the ApplicationUser models in the DbContext object named ApplicationDbContext
    // This service contains the Create, Read, Update & Delete methods

    public void Create(ApplicationUser newUser) // Creates a new user by adding a given ApplicationUser obj to the DbContext
    {
        context.ApplicationUsers.Add(newUser);
        context.SaveChanges();
        Console.WriteLine("User created. Name: " + newUser.Naam);
    }

    public ApplicationUser Read(string Id) // Returns the first ApplicationUser obj that matches the Id in DbContext.ApplicationUsers
    {
        var user = context.ApplicationUsers.FirstOrDefault(User => User.Id == Id);
        if (user != null){
            return user;
        }
        else{
            return null;
        }
    }

    public void Update(string Id, ApplicationUser updatedUser) // Updates a user in the DbContext that matches with the Id with the given updated user
    {
        var user = context.ApplicationUsers.FirstOrDefault(User => User.Id == Id);
        if (user != null){
            context.ApplicationUsers.Update(updatedUser);
        }
    }

    public void Delete(string Id) // Deletes the user from the DbContext that matches the Id
    {
        var user = context.ApplicationUsers.FirstOrDefault(User => User.Id == Id);
        if(user != null){
            context.ApplicationUsers.Remove(user);
            context.SaveChanges();
            Console.WriteLine("User Deleted. Name: " + user.Naam);
        }
    }
}