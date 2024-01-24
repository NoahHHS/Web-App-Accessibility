using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Net.Http.Headers;

namespace webapp_accessability.Models
{
    public class OnderzoekCreatieDTO
    {
        [Required(ErrorMessage = "The naam field is required.")]
        public string Naam { get; set; }

        [Required(ErrorMessage = "The beschrijving field is required.")]
        public string Omschrijving { get; set; }

        [Required(ErrorMessage = "The startDatum field is required.")]
        public DateTime StartDatum { get; set; }
        public int? LinkId { get; set; }
        public OnderzoekLinkDTO Link { get; set; } // Adjust if necessary

        public OnderzoekLocatieDTO Locatie { get; set; } // Adjust if necessary
    }

    public class OnderzoekLinkDTO
    {
        [Required(ErrorMessage = "The link field is required.")]
        public int id { get; set;}
        public string Link { get; set; }
    }

    public class OnderzoekLocatieDTO
    {
        [Required(ErrorMessage = "The adres field is required.")]
        public AdresDTO Adres { get; set; }
    }

    public class AdresDTO
    {
        [Required(ErrorMessage = "The straat field is required.")]
        public string Straat { get; set; }

        [Required(ErrorMessage = "The huisNr field is required.")]
        public int HuisNr { get; set; }

        public string Toevoeging { get; set; }

        [Required(ErrorMessage = "The postcode field is required.")]
        public string Postcode { get; set; }
    }
}
