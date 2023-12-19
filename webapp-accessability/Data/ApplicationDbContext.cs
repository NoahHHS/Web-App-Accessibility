using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using webapp_accessability.Models;

namespace webapp_accessability.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options,
            IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {
        }

        // Gebruikers / Rollen
        public DbSet<Admin> Admins {get; set;}
        public DbSet<Ervaringsdeskundige> Ervaringsdeskundigen {get; set;}
        public DbSet<Bedrijf> Bedrijven {get; set;}
        public DbSet<Medewerker> Medewerkers {get; set;}

        // Extra gegevens Accounts
        public DbSet<Betalingsgegevens> Betalingsgegevens { get; set; }
        public DbSet<Adres> Adressen { get; set; }
        public DbSet<Medischegegevens> Medischegegevens { get; set; }

        // Deelname
        public DbSet<Deelname> Deelnames { get; set; }

        // Onderzoek
        public DbSet<Onderzoek> Onderzoeken { get; set; }
        public DbSet<OnderzoekLink> OnderzoekLinks { get; set; }
        public DbSet<OnderzoekLocatie> OnderzoekLocaties { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Fluent API-configuraties hier plaatsen...
            // CONFIGURATIES
            // PK's configureren bij classes met Id
            // FK's configureren bij classes met FK's

            // Configuratie ApplicationUser 1 <--> Adres 1
            // -------------------------------------------
            // ApplicationUser heeft 1 Adres
            // Adres heeft 1 ApplicationUser


            // Configuratie Betalingsgegevens 1 <--> ApplicationUser 0..1
            // -------------------------------------------
            // Betalingsgegevens heeft 1 ApplicationUser
            // ApplicationUser heeft 0..1 Betalingsgegevens


            // Configuratie Medischegegevens 1 <--> ApplicationUser 0..*
            // -------------------------------------------
            // Medischegegevens heeft 1 ApplicationUser
            // ApplicationUser heeft 0..* Medischegegevens


            // Configuratie Deelname 1 <--> ApplicationUser 1
            // -------------------------------------------
            // Deelname heeft 1 ApplicationUser
            // ApplicationUser heeft 1 Deelname


            // Configuratie Onderzoek 1 <--> ApplicationUser 1
            // Configuratie Onderzoek 1 <--> OnderzoekLink 0..1
            // Configuratie Onderzoek 1 <--> OnderzoekLocatie 0..1
            // -------------------------------------------
            // Onderzoek heeft 1 ApplicationUser(Medewerker/Admin)
            // ApplicationUser(Medewerker/Admin) heeft 0..* Onderzoeken

            // Onderzoek heeft 0..1 OnderzoekLink
            // Onderzoek heeft 0..1 OnderzoekLocatie
        }
    }
}
