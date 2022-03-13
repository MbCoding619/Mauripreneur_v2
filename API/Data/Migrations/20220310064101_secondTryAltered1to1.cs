using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class secondTryAltered1to1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Professional_Users_AppUserId",
                table: "Professional");

            migrationBuilder.DropForeignKey(
                name: "FK_Sme_Users_AppUserId",
                table: "Sme");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "Sme",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "Professional",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Professional_Users_AppUserId",
                table: "Professional",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "AppUserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sme_Users_AppUserId",
                table: "Sme",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "AppUserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Professional_Users_AppUserId",
                table: "Professional");

            migrationBuilder.DropForeignKey(
                name: "FK_Sme_Users_AppUserId",
                table: "Sme");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "Sme",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "Professional",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Professional_Users_AppUserId",
                table: "Professional",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "AppUserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Sme_Users_AppUserId",
                table: "Sme",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "AppUserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
