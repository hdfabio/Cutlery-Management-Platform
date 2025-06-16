using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace mdp.Migrations
{
    public partial class AddDescricaoMDP : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                "FK_Operacoes_PlanosFabrico_PlanoFabricoId",
                "Operacoes");

            migrationBuilder.DropIndex(
                "IX_Operacoes_PlanoFabricoId",
                "Operacoes");

            migrationBuilder.DropColumn(
                "PlanoFabricoId",
                "Operacoes");

            migrationBuilder.CreateTable(
                "PlanoFabricoOperacoes",
                table => new
                {
                    PlanoFabricoId = table.Column<Guid>(),
                    OperacaoId = table.Column<Guid>()
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlanoFabricoOperacoes", x => new {x.OperacaoId, x.PlanoFabricoId});
                    table.ForeignKey(
                        "FK_PlanoFabricoOperacoes_Operacoes_OperacaoId",
                        x => x.OperacaoId,
                        "Operacoes",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        "FK_PlanoFabricoOperacoes_PlanosFabrico_PlanoFabricoId",
                        x => x.PlanoFabricoId,
                        "PlanosFabrico",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                "IX_PlanoFabricoOperacoes_PlanoFabricoId",
                "PlanoFabricoOperacoes",
                "PlanoFabricoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                "PlanoFabricoOperacoes");

            migrationBuilder.AddColumn<Guid>(
                "PlanoFabricoId",
                "Operacoes",
                nullable: true);

            migrationBuilder.CreateIndex(
                "IX_Operacoes_PlanoFabricoId",
                "Operacoes",
                "PlanoFabricoId");

            migrationBuilder.AddForeignKey(
                "FK_Operacoes_PlanosFabrico_PlanoFabricoId",
                "Operacoes",
                "PlanoFabricoId",
                "PlanosFabrico",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}