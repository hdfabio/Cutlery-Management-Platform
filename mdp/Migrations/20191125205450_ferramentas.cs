using Microsoft.EntityFrameworkCore.Migrations;

namespace mdp.Migrations
{
    public partial class ferramentas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Ferramenta",
                table: "Operacoes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ferramenta",
                table: "Operacoes");
        }
    }
}