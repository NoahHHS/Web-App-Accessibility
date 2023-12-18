using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapp_accessability.Data.Migrations
{
    /// <inheritdoc />
    public partial class eersteMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AangemeldPromos",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Bedrijfsnaam",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Beschikbaarheid",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Functie",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Naam",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Telnr",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VoorkeurBenadering",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Wachtwoord",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "bedrijfsTelNr",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Adres",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Straat = table.Column<string>(type: "TEXT", nullable: false),
                    HuisNr = table.Column<int>(type: "INTEGER", nullable: false),
                    Toevoeging = table.Column<string>(type: "TEXT", nullable: true),
                    Postcode = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Adres", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Adres");

            migrationBuilder.DropColumn(
                name: "AangemeldPromos",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Bedrijfsnaam",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Beschikbaarheid",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Functie",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Naam",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Telnr",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Token",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "VoorkeurBenadering",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Wachtwoord",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "bedrijfsTelNr",
                table: "AspNetUsers");
        }
    }
}
