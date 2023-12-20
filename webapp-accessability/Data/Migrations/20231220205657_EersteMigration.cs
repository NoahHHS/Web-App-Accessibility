using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapp_accessability.Data.Migrations
{
    /// <inheritdoc />
    public partial class EersteMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdresId",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "BedrijfsNaam",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "Beschikbaarheid",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Naam",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Rol",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "VoorkeurBenadering",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Adressen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Straat = table.Column<string>(type: "TEXT", nullable: false),
                    HuisNr = table.Column<int>(type: "INTEGER", nullable: false),
                    Toevoeging = table.Column<string>(type: "TEXT", nullable: false),
                    Postcode = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Adressen", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Betalingsgegevens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Iban = table.Column<string>(type: "TEXT", nullable: false),
                    Salaris = table.Column<double>(type: "REAL", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Betalingsgegevens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Betalingsgegevens_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Medischegegevens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Beperking = table.Column<string>(type: "TEXT", nullable: false),
                    Hulpmiddelen = table.Column<string>(type: "TEXT", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medischegegevens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Medischegegevens_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OnderzoekComponent",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Discriminator = table.Column<string>(type: "TEXT", nullable: false),
                    Link = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnderzoekComponent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OnderzoekComponent_Adressen_Id",
                        column: x => x.Id,
                        principalTable: "Adressen",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Onderzoeken",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Naam = table.Column<string>(type: "TEXT", nullable: false),
                    Omschrijving = table.Column<string>(type: "TEXT", nullable: false),
                    StartDatum = table.Column<DateTime>(type: "TEXT", nullable: false),
                    EindDatum = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Status = table.Column<bool>(type: "INTEGER", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: false),
                    MedewerkerId = table.Column<string>(type: "TEXT", nullable: false),
                    LinkId = table.Column<int>(type: "INTEGER", nullable: true),
                    LocatieId = table.Column<int>(type: "INTEGER", nullable: true),
                    OnderzoekComponentId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Onderzoeken", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Onderzoeken_AspNetUsers_MedewerkerId",
                        column: x => x.MedewerkerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Onderzoeken_OnderzoekComponent_LinkId",
                        column: x => x.LinkId,
                        principalTable: "OnderzoekComponent",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Onderzoeken_OnderzoekComponent_LocatieId",
                        column: x => x.LocatieId,
                        principalTable: "OnderzoekComponent",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Onderzoeken_OnderzoekComponent_OnderzoekComponentId",
                        column: x => x.OnderzoekComponentId,
                        principalTable: "OnderzoekComponent",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Deelnames",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Datum = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ApplicationUserId = table.Column<string>(type: "TEXT", nullable: false),
                    OnderzoekId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deelnames", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Deelnames_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Deelnames_Onderzoeken_OnderzoekId",
                        column: x => x.OnderzoekId,
                        principalTable: "Onderzoeken",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_AdresId",
                table: "AspNetUsers",
                column: "AdresId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Betalingsgegevens_ApplicationUserId",
                table: "Betalingsgegevens",
                column: "ApplicationUserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Deelnames_ApplicationUserId",
                table: "Deelnames",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Deelnames_OnderzoekId",
                table: "Deelnames",
                column: "OnderzoekId");

            migrationBuilder.CreateIndex(
                name: "IX_Medischegegevens_ApplicationUserId",
                table: "Medischegegevens",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Onderzoeken_LinkId",
                table: "Onderzoeken",
                column: "LinkId");

            migrationBuilder.CreateIndex(
                name: "IX_Onderzoeken_LocatieId",
                table: "Onderzoeken",
                column: "LocatieId");

            migrationBuilder.CreateIndex(
                name: "IX_Onderzoeken_MedewerkerId",
                table: "Onderzoeken",
                column: "MedewerkerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Onderzoeken_OnderzoekComponentId",
                table: "Onderzoeken",
                column: "OnderzoekComponentId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Adressen_AdresId",
                table: "AspNetUsers",
                column: "AdresId",
                principalTable: "Adressen",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Adressen_AdresId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Betalingsgegevens");

            migrationBuilder.DropTable(
                name: "Deelnames");

            migrationBuilder.DropTable(
                name: "Medischegegevens");

            migrationBuilder.DropTable(
                name: "Onderzoeken");

            migrationBuilder.DropTable(
                name: "OnderzoekComponent");

            migrationBuilder.DropTable(
                name: "Adressen");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_AdresId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AdresId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "BedrijfsNaam",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Beschikbaarheid",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Naam",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Rol",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Token",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "VoorkeurBenadering",
                table: "AspNetUsers");
        }
    }
}
