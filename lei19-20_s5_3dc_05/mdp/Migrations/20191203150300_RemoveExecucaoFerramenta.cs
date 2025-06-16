using Microsoft.EntityFrameworkCore.Migrations;

namespace mdp.Migrations
{
    public partial class RemoveExecucaoFerramenta : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TempoExecucao",
                table: "Ferramenta");

            migrationBuilder.RenameColumn(
                name: "Duracao",
                table: "Operacoes",
                newName: "Execucao");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Execucao",
                table: "Operacoes",
                newName: "Duracao");

            migrationBuilder.AddColumn<long>(
                name: "TempoExecucao",
                table: "Ferramenta",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
