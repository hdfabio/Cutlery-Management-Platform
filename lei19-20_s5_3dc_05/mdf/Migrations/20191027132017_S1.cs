using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace mdf.Migrations
{
    public partial class S1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                "LinhasProducao",
                table => new
                {
                    Id = table.Column<Guid>()
                },
                constraints: table => { table.PrimaryKey("PK_LinhasProducao", x => x.Id); });

            migrationBuilder.CreateTable(
                "TiposMaquinas",
                table => new
                {
                    Id = table.Column<Guid>()
                },
                constraints: table => { table.PrimaryKey("PK_TiposMaquinas", x => x.Id); });

            migrationBuilder.CreateTable(
                "Maquinas",
                table => new
                {
                    Id = table.Column<Guid>(),
                    Localizacao = table.Column<string>(nullable: true),
                    TipoMaquinaId = table.Column<Guid>(nullable: true),
                    LinhaProducaoId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maquinas", x => x.Id);
                    table.ForeignKey(
                        "FK_Maquinas_LinhasProducao_LinhaProducaoId",
                        x => x.LinhaProducaoId,
                        "LinhasProducao",
                        "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        "FK_Maquinas_TiposMaquinas_TipoMaquinaId",
                        x => x.TipoMaquinaId,
                        "TiposMaquinas",
                        "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                "Operacoes",
                table => new
                {
                    Id = table.Column<Guid>(),
                    Descricao = table.Column<string>(maxLength: 300, nullable: true),
                    Duracao = table.Column<long>(),
                    TipoMaquinaId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operacoes", x => x.Id);
                    table.ForeignKey(
                        "FK_Operacoes_TiposMaquinas_TipoMaquinaId",
                        x => x.TipoMaquinaId,
                        "TiposMaquinas",
                        "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                "IX_Maquinas_LinhaProducaoId",
                "Maquinas",
                "LinhaProducaoId");

            migrationBuilder.CreateIndex(
                "IX_Maquinas_TipoMaquinaId",
                "Maquinas",
                "TipoMaquinaId");

            migrationBuilder.CreateIndex(
                "IX_Operacoes_TipoMaquinaId",
                "Operacoes",
                "TipoMaquinaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                "Maquinas");

            migrationBuilder.DropTable(
                "Operacoes");

            migrationBuilder.DropTable(
                "LinhasProducao");

            migrationBuilder.DropTable(
                "TiposMaquinas");
        }
    }
}