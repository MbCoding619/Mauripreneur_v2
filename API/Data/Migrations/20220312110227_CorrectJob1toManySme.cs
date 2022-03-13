using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class CorrectJob1toManySme : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Job_Fields_FieldId",
                table: "Job");

            migrationBuilder.DropForeignKey(
                name: "FK_Job_Sme_SmeId",
                table: "Job");

            migrationBuilder.DropForeignKey(
                name: "FK_Organization_Users_AppUserId",
                table: "Organization");

            migrationBuilder.DropForeignKey(
                name: "FK_Student_Fields_FieldId",
                table: "Student");

            migrationBuilder.DropForeignKey(
                name: "FK_Student_Users_AppUserId",
                table: "Student");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Student",
                table: "Student");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Organization",
                table: "Organization");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Job",
                table: "Job");

            migrationBuilder.RenameTable(
                name: "Student",
                newName: "Students");

            migrationBuilder.RenameTable(
                name: "Organization",
                newName: "Organizations");

            migrationBuilder.RenameTable(
                name: "Job",
                newName: "Jobs");

            migrationBuilder.RenameIndex(
                name: "IX_Student_FieldId",
                table: "Students",
                newName: "IX_Students_FieldId");

            migrationBuilder.RenameIndex(
                name: "IX_Student_AppUserId",
                table: "Students",
                newName: "IX_Students_AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Organization_AppUserId",
                table: "Organizations",
                newName: "IX_Organizations_AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Job_SmeId",
                table: "Jobs",
                newName: "IX_Jobs_SmeId");

            migrationBuilder.RenameIndex(
                name: "IX_Job_FieldId",
                table: "Jobs",
                newName: "IX_Jobs_FieldId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Students",
                table: "Students",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Organizations",
                table: "Organizations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Jobs",
                table: "Jobs",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Fields_FieldId",
                table: "Jobs",
                column: "FieldId",
                principalTable: "Fields",
                principalColumn: "FieldId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Sme_SmeId",
                table: "Jobs",
                column: "SmeId",
                principalTable: "Sme",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Organizations_Users_AppUserId",
                table: "Organizations",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "AppUserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Fields_FieldId",
                table: "Students",
                column: "FieldId",
                principalTable: "Fields",
                principalColumn: "FieldId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Users_AppUserId",
                table: "Students",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "AppUserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Fields_FieldId",
                table: "Jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Sme_SmeId",
                table: "Jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_Organizations_Users_AppUserId",
                table: "Organizations");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Fields_FieldId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Users_AppUserId",
                table: "Students");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Students",
                table: "Students");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Organizations",
                table: "Organizations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Jobs",
                table: "Jobs");

            migrationBuilder.RenameTable(
                name: "Students",
                newName: "Student");

            migrationBuilder.RenameTable(
                name: "Organizations",
                newName: "Organization");

            migrationBuilder.RenameTable(
                name: "Jobs",
                newName: "Job");

            migrationBuilder.RenameIndex(
                name: "IX_Students_FieldId",
                table: "Student",
                newName: "IX_Student_FieldId");

            migrationBuilder.RenameIndex(
                name: "IX_Students_AppUserId",
                table: "Student",
                newName: "IX_Student_AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Organizations_AppUserId",
                table: "Organization",
                newName: "IX_Organization_AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Jobs_SmeId",
                table: "Job",
                newName: "IX_Job_SmeId");

            migrationBuilder.RenameIndex(
                name: "IX_Jobs_FieldId",
                table: "Job",
                newName: "IX_Job_FieldId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Student",
                table: "Student",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Organization",
                table: "Organization",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Job",
                table: "Job",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Job_Fields_FieldId",
                table: "Job",
                column: "FieldId",
                principalTable: "Fields",
                principalColumn: "FieldId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Job_Sme_SmeId",
                table: "Job",
                column: "SmeId",
                principalTable: "Sme",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Organization_Users_AppUserId",
                table: "Organization",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "AppUserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Student_Fields_FieldId",
                table: "Student",
                column: "FieldId",
                principalTable: "Fields",
                principalColumn: "FieldId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Student_Users_AppUserId",
                table: "Student",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "AppUserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
