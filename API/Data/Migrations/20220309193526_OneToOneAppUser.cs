using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class OneToOneAppUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Sme");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Sme");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Sme");

            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "Sme",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Sme_AppUserId",
                table: "Sme",
                column: "AppUserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Sme_Users_AppUserId",
                table: "Sme",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sme_Users_AppUserId",
                table: "Sme");

            migrationBuilder.DropIndex(
                name: "IX_Sme_AppUserId",
                table: "Sme");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Sme");

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "Sme",
                type: "BLOB",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "Sme",
                type: "BLOB",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Sme",
                type: "TEXT",
                nullable: true);
        }
    }
}
