using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapp_accessability.Data.Migrations
{
    /// <inheritdoc />
    public partial class EersteModelsEnDbSetsEnFluentApi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Betalingsgegevens_BetalingsgegevensId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Medischegegevens_MedischegegevensId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Deelnames_AspNetUsers_AccountId",
                table: "Deelnames");

            migrationBuilder.DropForeignKey(
                name: "FK_Onderzoeken_OnderzoekLinks_LinkId",
                table: "Onderzoeken");

            migrationBuilder.DropForeignKey(
                name: "FK_Onderzoeken_OnderzoekLocaties_LocatieId",
                table: "Onderzoeken");

            migrationBuilder.DropForeignKey(
                name: "FK_OnderzoekLocaties_Adressen_Id",
                table: "OnderzoekLocaties");

            migrationBuilder.DropTable(
                name: "OnderzoekLinks");

            migrationBuilder.DropIndex(
                name: "IX_Onderzoeken_LinkId",
                table: "Onderzoeken");

            migrationBuilder.DropIndex(
                name: "IX_Onderzoeken_LocatieId",
                table: "Onderzoeken");

            migrationBuilder.DropIndex(
                name: "IX_Onderzoeken_MedewerkerId",
                table: "Onderzoeken");

            migrationBuilder.DropIndex(
                name: "IX_Deelnames_AccountId",
                table: "Deelnames");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_BetalingsgegevensId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_MedischegegevensId",
                table: "AspNetUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OnderzoekLocaties",
                table: "OnderzoekLocaties");

            migrationBuilder.DropColumn(
                name: "AccountId",
                table: "Deelnames");

            migrationBuilder.DropColumn(
                name: "BetalingsgegevensId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "MedischegegevensId",
                table: "AspNetUsers");

            migrationBuilder.RenameTable(
                name: "OnderzoekLocaties",
                newName: "OnderzoekComponent");

            migrationBuilder.RenameColumn(
                name: "OnderzoeksResultaat",
                table: "Deelnames",
                newName: "ApplicationUserId");

            migrationBuilder.AddColumn<int>(
                name: "OnderzoekComponentId",
                table: "Onderzoeken",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Medischegegevens",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Betalingsgegevens",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "VoorkeurBenadering",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Token",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Rol",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Naam",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "Beschikbaarheid",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "BedrijfsNaam",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AdresId",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "OnderzoekComponent",
                type: "TEXT",
                maxLength: 21,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Link",
                table: "OnderzoekComponent",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_OnderzoekComponent",
                table: "OnderzoekComponent",
                column: "Id");

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

            migrationBuilder.CreateIndex(
                name: "IX_Medischegegevens_ApplicationUserId",
                table: "Medischegegevens",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Deelnames_ApplicationUserId",
                table: "Deelnames",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Betalingsgegevens_ApplicationUserId",
                table: "Betalingsgegevens",
                column: "ApplicationUserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Betalingsgegevens_AspNetUsers_ApplicationUserId",
                table: "Betalingsgegevens",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Deelnames_AspNetUsers_ApplicationUserId",
                table: "Deelnames",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Medischegegevens_AspNetUsers_ApplicationUserId",
                table: "Medischegegevens",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OnderzoekComponent_Adressen_Id",
                table: "OnderzoekComponent",
                column: "Id",
                principalTable: "Adressen",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Onderzoeken_OnderzoekComponent_LinkId",
                table: "Onderzoeken",
                column: "LinkId",
                principalTable: "OnderzoekComponent",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Onderzoeken_OnderzoekComponent_LocatieId",
                table: "Onderzoeken",
                column: "LocatieId",
                principalTable: "OnderzoekComponent",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Onderzoeken_OnderzoekComponent_OnderzoekComponentId",
                table: "Onderzoeken",
                column: "OnderzoekComponentId",
                principalTable: "OnderzoekComponent",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Betalingsgegevens_AspNetUsers_ApplicationUserId",
                table: "Betalingsgegevens");

            migrationBuilder.DropForeignKey(
                name: "FK_Deelnames_AspNetUsers_ApplicationUserId",
                table: "Deelnames");

            migrationBuilder.DropForeignKey(
                name: "FK_Medischegegevens_AspNetUsers_ApplicationUserId",
                table: "Medischegegevens");

            migrationBuilder.DropForeignKey(
                name: "FK_OnderzoekComponent_Adressen_Id",
                table: "OnderzoekComponent");

            migrationBuilder.DropForeignKey(
                name: "FK_Onderzoeken_OnderzoekComponent_LinkId",
                table: "Onderzoeken");

            migrationBuilder.DropForeignKey(
                name: "FK_Onderzoeken_OnderzoekComponent_LocatieId",
                table: "Onderzoeken");

            migrationBuilder.DropForeignKey(
                name: "FK_Onderzoeken_OnderzoekComponent_OnderzoekComponentId",
                table: "Onderzoeken");

            migrationBuilder.DropIndex(
                name: "IX_Onderzoeken_LinkId",
                table: "Onderzoeken");

            migrationBuilder.DropIndex(
                name: "IX_Onderzoeken_LocatieId",
                table: "Onderzoeken");

            migrationBuilder.DropIndex(
                name: "IX_Onderzoeken_MedewerkerId",
                table: "Onderzoeken");

            migrationBuilder.DropIndex(
                name: "IX_Onderzoeken_OnderzoekComponentId",
                table: "Onderzoeken");

            migrationBuilder.DropIndex(
                name: "IX_Medischegegevens_ApplicationUserId",
                table: "Medischegegevens");

            migrationBuilder.DropIndex(
                name: "IX_Deelnames_ApplicationUserId",
                table: "Deelnames");

            migrationBuilder.DropIndex(
                name: "IX_Betalingsgegevens_ApplicationUserId",
                table: "Betalingsgegevens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OnderzoekComponent",
                table: "OnderzoekComponent");

            migrationBuilder.DropColumn(
                name: "OnderzoekComponentId",
                table: "Onderzoeken");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Medischegegevens");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Betalingsgegevens");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "OnderzoekComponent");

            migrationBuilder.DropColumn(
                name: "Link",
                table: "OnderzoekComponent");

            migrationBuilder.RenameTable(
                name: "OnderzoekComponent",
                newName: "OnderzoekLocaties");

            migrationBuilder.RenameColumn(
                name: "ApplicationUserId",
                table: "Deelnames",
                newName: "OnderzoeksResultaat");

            migrationBuilder.AddColumn<string>(
                name: "AccountId",
                table: "Deelnames",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "VoorkeurBenadering",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Token",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Rol",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Naam",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Beschikbaarheid",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "BedrijfsNaam",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<int>(
                name: "AdresId",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "BetalingsgegevensId",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUsers",
                type: "TEXT",
                maxLength: 21,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "MedischegegevensId",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_OnderzoekLocaties",
                table: "OnderzoekLocaties",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "OnderzoekLinks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Link = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnderzoekLinks", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Onderzoeken_LinkId",
                table: "Onderzoeken",
                column: "LinkId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Onderzoeken_LocatieId",
                table: "Onderzoeken",
                column: "LocatieId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Onderzoeken_MedewerkerId",
                table: "Onderzoeken",
                column: "MedewerkerId");

            migrationBuilder.CreateIndex(
                name: "IX_Deelnames_AccountId",
                table: "Deelnames",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_BetalingsgegevensId",
                table: "AspNetUsers",
                column: "BetalingsgegevensId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_MedischegegevensId",
                table: "AspNetUsers",
                column: "MedischegegevensId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Betalingsgegevens_BetalingsgegevensId",
                table: "AspNetUsers",
                column: "BetalingsgegevensId",
                principalTable: "Betalingsgegevens",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Medischegegevens_MedischegegevensId",
                table: "AspNetUsers",
                column: "MedischegegevensId",
                principalTable: "Medischegegevens",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Deelnames_AspNetUsers_AccountId",
                table: "Deelnames",
                column: "AccountId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Onderzoeken_OnderzoekLinks_LinkId",
                table: "Onderzoeken",
                column: "LinkId",
                principalTable: "OnderzoekLinks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Onderzoeken_OnderzoekLocaties_LocatieId",
                table: "Onderzoeken",
                column: "LocatieId",
                principalTable: "OnderzoekLocaties",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OnderzoekLocaties_Adressen_Id",
                table: "OnderzoekLocaties",
                column: "Id",
                principalTable: "Adressen",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
