using Microsoft.EntityFrameworkCore.Migrations;

namespace mdf.Migrations
{
    public partial class RemoveExecucaoFerramenta : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TempoExecucao",
                table: "Ferramentas");

            migrationBuilder.RenameColumn(
                name: "Duracao",
                table: "Operacoes",
                newName: "TempoExecucao");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TempoExecucao",
                table: "Operacoes",
                newName: "Duracao");

            migrationBuilder.AddColumn<long>(
                name: "TempoExecucao",
                table: "Ferramentas",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
