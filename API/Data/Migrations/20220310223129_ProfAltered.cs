using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class ProfAltered : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Professional_Field_FieldId",
                table: "Professional");

            migrationBuilder.DropForeignKey(
                name: "FK_Professional_Users_AppUserId",
                table: "Professional");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Professional",
                table: "Professional");

            migrationBuilder.RenameTable(
                name: "Professional",
                newName: "Professionals");

            migrationBuilder.RenameColumn(
                name: "Porfolio",
                table: "Professionals",
                newName: "Portfolio");

            migrationBuilder.RenameIndex(
                name: "IX_Professional_FieldId",
                table: "Professionals",
                newName: "IX_Professionals_FieldId");

            migrationBuilder.RenameIndex(
                name: "IX_Professional_AppUserId",
                table: "Professionals",
                newName: "IX_Professionals_AppUserId");

            migrationBuilder.AlterColumn<string>(
                name: "IDNum",
                table: "Professionals",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Professionals",
                table: "Professionals",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Professionals_Field_FieldId",
                table: "Professionals",
                column: "FieldId",
                principalTable: "Field",
                principalColumn: "FieldId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Professionals_Users_AppUserId",
                table: "Professionals",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "AppUserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Professionals_Field_FieldId",
                table: "Professionals");

            migrationBuilder.DropForeignKey(
                name: "FK_Professionals_Users_AppUserId",
                table: "Professionals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Professionals",
                table: "Professionals");

            migrationBuilder.RenameTable(
                name: "Professionals",
                newName: "Professional");

            migrationBuilder.RenameColumn(
                name: "Portfolio",
                table: "Professional",
                newName: "Porfolio");

            migrationBuilder.RenameIndex(
                name: "IX_Professionals_FieldId",
                table: "Professional",
                newName: "IX_Professional_FieldId");

            migrationBuilder.RenameIndex(
                name: "IX_Professionals_AppUserId",
                table: "Professional",
                newName: "IX_Professional_AppUserId");

            migrationBuilder.AlterColumn<int>(
                name: "IDNum",
                table: "Professional",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Professional",
                table: "Professional",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Professional_Field_FieldId",
                table: "Professional",
                column: "FieldId",
                principalTable: "Field",
                principalColumn: "FieldId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Professional_Users_AppUserId",
                table: "Professional",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "AppUserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
