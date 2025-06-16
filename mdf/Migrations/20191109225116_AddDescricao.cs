using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace mdf.Migrations
{
    public partial class AddDescricao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Maquinas_LinhasProducao_LinhaProducaoId",
                "Maquinas");

            migrationBuilder.DropForeignKey(
                "FK_Operacoes_TiposMaquinas_TipoMaquinaId",
                "Operacoes");

            migrationBuilder.DropIndex(
                "IX_Operacoes_TipoMaquinaId",
                "Operacoes");

            migrationBuilder.DropIndex(
                "IX_Maquinas_LinhaProducaoId",
                "Maquinas");

            migrationBuilder.DropColumn(
                "TipoMaquinaId",
                "Operacoes");

            migrationBuilder.DropColumn(
                "LinhaProducaoId",
                "Maquinas");

            migrationBuilder.AddColumn<string>(
                "Descricao",
                "TiposMaquinas",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                "Descricao",
                "Maquinas",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                "Descricao",
                "LinhasProducao",
                nullable: true);

            migrationBuilder.CreateTable(
                "TipoMaquinaOperacoes",
                table => new
                {
                    TipoMaquinaId = table.Column<Guid>(),
                    OperacaoId = table.Column<Guid>()
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoMaquinaOpercoes", x => new {x.OperacaoId, x.TipoMaquinaId});
                    table.ForeignKey(
                        "FK_TipoMaquinaOpercoes_Operacoes_OperacaoId",
                        x => x.OperacaoId,
                        "Operacoes",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        "FK_TipoMaquinaOpercoes_TiposMaquinas_TipoMaquinaId",
                        x => x.TipoMaquinaId,
                        "TiposMaquinas",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                "IX_TipoMaquinaOpercoes_TipoMaquinaId",
                "TipoMaquinaOperacoes",
                "TipoMaquinaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                "TipoMaquinaOperacoes");

            migrationBuilder.DropColumn(
                "Descricao",
                "TiposMaquinas");

            migrationBuilder.DropColumn(
                "Descricao",
                "Maquinas");

            migrationBuilder.DropColumn(
                "Descricao",
                "LinhasProducao");

            migrationBuilder.AddColumn<Guid>(
                "TipoMaquinaId",
                "Operacoes",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                "LinhaProducaoId",
                "Maquinas",
                nullable: true);

            migrationBuilder.CreateIndex(
                "IX_Operacoes_TipoMaquinaId",
                "Operacoes",
                "TipoMaquinaId");

            migrationBuilder.CreateIndex(
                "IX_Maquinas_LinhaProducaoId",
                "Maquinas",
                "LinhaProducaoId");

            migrationBuilder.AddForeignKey(
                "FK_Maquinas_LinhasProducao_LinhaProducaoId",
                "Maquinas",
                "LinhaProducaoId",
                "LinhasProducao",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                "FK_Operacoes_TiposMaquinas_TipoMaquinaId",
                "Operacoes",
                "TipoMaquinaId",
                "TiposMaquinas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}