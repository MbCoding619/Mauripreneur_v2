using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class Altered1to1andAddProf : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sme_Users_AppUserId",
                table: "Sme");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Users",
                newName: "AppUserId");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "Sme",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.CreateTable(
                name: "Field",
                columns: table => new
                {
                    FieldId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Field", x => x.FieldId);
                });

            migrationBuilder.CreateTable(
                name: "Professional",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FName = table.Column<string>(type: "TEXT", nullable: true),
                    LName = table.Column<string>(type: "TEXT", nullable: true),
                    IDNum = table.Column<int>(type: "INTEGER", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    Phone = table.Column<int>(type: "INTEGER", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    Qual1 = table.Column<string>(type: "TEXT", nullable: true),
                    Qual2 = table.Column<string>(type: "TEXT", nullable: true),
                    Qual3 = table.Column<string>(type: "TEXT", nullable: true),
                    QualOther = table.Column<string>(type: "TEXT", nullable: true),
                    BriefDesc = table.Column<string>(type: "TEXT", nullable: true),
                    Porfolio = table.Column<string>(type: "TEXT", nullable: true),
                    EmploymentStatus = table.Column<string>(type: "TEXT", nullable: true),
                    AppUserId = table.Column<int>(type: "INTEGER", nullable: true),
                    FieldId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Professional", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Professional_Field_FieldId",
                        column: x => x.FieldId,
                        principalTable: "Field",
                        principalColumn: "FieldId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Professional_Users_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "Users",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Professional_AppUserId",
                table: "Professional",
                column: "AppUserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Professional_FieldId",
                table: "Professional",
                column: "FieldId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sme_Users_AppUserId",
                table: "Sme",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "AppUserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sme_Users_AppUserId",
                table: "Sme");

            migrationBuilder.DropTable(
                name: "Professional");

            migrationBuilder.DropTable(
                name: "Field");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "Users",
                newName: "Id");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "Sme",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Sme_Users_AppUserId",
                table: "Sme",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
