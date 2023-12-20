using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using webapp_accessability.Models;

namespace webapp_accessability.Data;

    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options,
            IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {
        }

        // // Gebruikers / Rollen
        // public DbSet<Admin> Admins {get; set;}
        // public DbSet<Ervaringsdeskundige> Ervaringsdeskundigen {get; set;}
        // public DbSet<Bedrijf> Bedrijven {get; set;}
        // public DbSet<Medewerker> Medewerkers {get; set;}
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }

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

            // Fluent API-configuraties

            // Configuratie ApplicationUser 1 <--> Adres 1
            // -------------------------------------------
            // ApplicationUser heeft 1 Adres
            // Adres heeft 1 ApplicationUser

            // Definieer dat de AdresId van ApplicationUser de Id is van Adres 1 op 1
            modelBuilder.Entity<ApplicationUser>()
                .HasOne(a => a.Adres)
                .WithOne()
                .HasForeignKey<ApplicationUser>(a => a.AdresId);


            // Configuratie Betalingsgegevens 1 <--> ApplicationUser 0..1
            // -------------------------------------------
            // Betalingsgegevens heeft 1 ApplicationUser
            // ApplicationUser heeft 0..1 Betalingsgegevens
            modelBuilder.Entity<Betalingsgegevens>()
                .HasOne(bg => bg.ApplicationUser)
                .WithOne()
                .HasForeignKey<Betalingsgegevens>(bg => bg.ApplicationUserId)
                .IsRequired(false);


            // Configuratie Medischegegevens 1 <--> ApplicationUser 0..*
            // -------------------------------------------
            // Medischegegevens heeft 1 ApplicationUser
            // ApplicationUser heeft 0..* Medischegegevens

            modelBuilder.Entity<Medischegegevens>()
                .HasOne(m => m.ApplicationUser)
                .WithMany(u => u.Medischegegevens)
                .HasForeignKey(m => m.ApplicationUserId)
                .IsRequired(false);


            // Configuratie Deelname 1 <--> ApplicationUser 1
            // -------------------------------------------
            // Deelname heeft 1 ApplicationUser
            // ApplicationUser heeft 1 Deelname

            modelBuilder.Entity<Deelname>()
                .HasOne(d => d.Account)
                .WithMany(a => a.Deelnames)
                .HasForeignKey(d => d.ApplicationUserId);

            modelBuilder.Entity<Deelname>()
                .HasOne(d => d.Onderzoek)
                .WithMany(o => o.Deelnames)
                .HasForeignKey(d => d.OnderzoekId);

            modelBuilder.Entity<Onderzoek>()
                .HasMany(o => o.Deelnames)
                .WithOne(d => d.Onderzoek)
                .HasForeignKey(d => d.OnderzoekId);


            // Configuratie Onderzoek 1 <--> ApplicationUser 1
            // Configuratie Onderzoek 1 <--> OnderzoekLink 0..1
            // Configuratie Onderzoek 1 <--> OnderzoekLocatie 0..1
            // -------------------------------------------
            // Onderzoek heeft 1 ApplicationUser(Medewerker/Admin)
            // ApplicationUser(Medewerker/Admin) heeft 0..* Onderzoeken

            modelBuilder.Entity<Onderzoek>()
                .HasOne(o => o.Medewerker)
                .WithOne(u => u.Onderzoek)
                .HasForeignKey<Onderzoek>(o => o.MedewerkerId)
                .IsRequired();


            // Onderzoek heeft 0..1 OnderzoekLink
            // Onderzoek heeft 0..1 OnderzoekLocatie
            // Maakt gebruik van OnderzoekComponent Onderzoek Link/Locatie inherit het id can OnderzoekComponent
            modelBuilder.Entity<Onderzoek>()
                .HasOne(o => o.OnderzoekComponent)
                .WithOne()
                .HasForeignKey<Onderzoek>("OnderzoekComponentId")
                .IsRequired(false);

            // OnderzoekLocatie <--> Adres        
            modelBuilder.Entity<OnderzoekLocatie>()
                .HasOne(ol => ol.Adres)
                .WithOne()
                .HasForeignKey<OnderzoekLocatie>(ol => ol.Id) // Id van OnderzoekLocatie als FK naar Adres
                .IsRequired();


            // PRIMAIRE SLEUTELS
            modelBuilder.Entity<Adres>()
                .HasKey(a => a.Id);
            
            modelBuilder.Entity<Betalingsgegevens>()
                .HasKey(b => b.Id);

            modelBuilder.Entity<Medischegegevens>()
                .HasKey(m => m.Id);

            modelBuilder.Entity<Deelname>()
                .HasKey(d => d.Id);

            modelBuilder.Entity<Onderzoek>()
                .HasKey(o => o.Id);
            
            modelBuilder.Entity<OnderzoekComponent>()
                .HasKey(oc => oc.Id);

            modelBuilder.Entity<OnderzoekLink>()
                .HasBaseType<OnderzoekComponent>();

            modelBuilder.Entity<OnderzoekLocatie>()
                .HasBaseType<OnderzoekComponent>();
        }
    }
