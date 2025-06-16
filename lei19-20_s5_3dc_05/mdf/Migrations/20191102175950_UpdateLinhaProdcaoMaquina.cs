using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace mdf.Migrations
{
    public partial class UpdateLinhaProdcaoMaquina : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                "LinhaProducaoMaquinas",
                table => new
                {
                    LinhaProducaoId = table.Column<Guid>(),
                    MaquinaId = table.Column<Guid>()
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LinhaProducaoMaquinas", x => new {x.MaquinaId, x.LinhaProducaoId});
                    table.ForeignKey(
                        "FK_LinhaProducaoMaquinas_LinhasProducao_LinhaProducaoId",
                        x => x.LinhaProducaoId,
                        "LinhasProducao",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        "FK_LinhaProducaoMaquinas_Maquinas_MaquinaId",
                        x => x.MaquinaId,
                        "Maquinas",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                "IX_LinhaProducaoMaquinas_LinhaProducaoId",
                "LinhaProducaoMaquinas",
                "LinhaProducaoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                "LinhaProducaoMaquinas");
        }
    }
}