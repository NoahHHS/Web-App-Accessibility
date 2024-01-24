using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapp_accessability.Migrations
{
    /// <inheritdoc />
    public partial class AddRelationToOnderzoek : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BedrijfId",
                table: "Onderzoeken",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Achternaam",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Toevoeging",
                table: "Adressen",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.CreateIndex(
                name: "IX_Onderzoeken_BedrijfId",
                table: "Onderzoeken",
                column: "BedrijfId");

            migrationBuilder.AddForeignKey(
                name: "FK_Onderzoeken_AspNetUsers_BedrijfId",
                table: "Onderzoeken",
                column: "BedrijfId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Onderzoeken_AspNetUsers_BedrijfId",
                table: "Onderzoeken");

            migrationBuilder.DropIndex(
                name: "IX_Onderzoeken_BedrijfId",
                table: "Onderzoeken");

            migrationBuilder.DropColumn(
                name: "BedrijfId",
                table: "Onderzoeken");

            migrationBuilder.DropColumn(
                name: "Achternaam",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "Toevoeging",
                table: "Adressen",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);
        }
    }
}
