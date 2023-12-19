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

        public DbSet<Betalingsgegevens> Betalingsgegevens { get; set; }
        public DbSet<Adres> Adressen { get; set; }
        public DbSet<Medischegegevens> Medischegegevens { get; set; }
        public DbSet<Deelname> Deelnames { get; set; }
        public DbSet<Onderzoek> Onderzoeken { get; set; }
        public DbSet<OnderzoekLink> OnderzoekLinks { get; set; }
        public DbSet<OnderzoekLocatie> OnderzoekLocaties { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Fluent API-configuraties hier plaatsen...
            // (voeg de configuraties zoals eerder verstrekt toe)
            
            // Configureer relatie tussen Account en Betalingsgegevens

        }
    }
}
