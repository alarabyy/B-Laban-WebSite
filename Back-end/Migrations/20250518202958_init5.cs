using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Belabn.Migrations
{
    /// <inheritdoc />
    public partial class init5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_usersModel",
                table: "usersModel");

            migrationBuilder.RenameTable(
                name: "usersModel",
                newName: "UsersModel");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersModel",
                table: "UsersModel",
                column: "UserName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersModel",
                table: "UsersModel");

            migrationBuilder.RenameTable(
                name: "UsersModel",
                newName: "usersModel");

            migrationBuilder.AddPrimaryKey(
                name: "PK_usersModel",
                table: "usersModel",
                column: "UserName");
        }
    }
}
