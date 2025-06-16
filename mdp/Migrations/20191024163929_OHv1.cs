using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace mdp.Migrations
{
    public partial class OHv1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                "OperacaoDTO");

            migrationBuilder.CreateTable(
                "Operacoes",
                table => new
                {
                    Id = table.Column<Guid>(),
                    Descricao = table.Column<string>(maxLength: 300, nullable: true),
                    Duracao = table.Column<long>(),
                    PlanoFabricoId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operacoes", x => x.Id);
                    table.ForeignKey(
                        "FK_Operacoes_PlanosFabrico_PlanoFabricoId",
                        x => x.PlanoFabricoId,
                        "PlanosFabrico",
                        "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                "IX_Operacoes_PlanoFabricoId",
                "Operacoes",
                "PlanoFabricoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                "Operacoes");

            migrationBuilder.CreateTable(
                "OperacaoDTO",
                table => new
                {
                    Id = table.Column<string>(),
                    Descricao = table.Column<string>(nullable: true),
                    Duracao = table.Column<long>(),
                    PlanoFabricoId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperacaoDTO", x => x.Id);
                    table.ForeignKey(
                        "FK_OperacaoDTO_PlanosFabrico_PlanoFabricoId",
                        x => x.PlanoFabricoId,
                        "PlanosFabrico",
                        "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                "IX_OperacaoDTO_PlanoFabricoId",
                "OperacaoDTO",
                "PlanoFabricoId");
        }
    }
}