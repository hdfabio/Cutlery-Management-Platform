using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace mdp.Migrations
{
    public partial class ferramentasv2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FerramentaOperacao");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FerramentaOperacao",
                columns: table => new
                {
                    FerramentaId = table.Column<Guid>(nullable: false),
                    OperacaoId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FerramentaOperacao", x => new {x.FerramentaId, x.OperacaoId});
                    table.ForeignKey(
                        name: "FK_FerramentaOperacao_Ferramenta_FerramentaId",
                        column: x => x.FerramentaId,
                        principalTable: "Ferramenta",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FerramentaOperacao_Operacoes_OperacaoId",
                        column: x => x.OperacaoId,
                        principalTable: "Operacoes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FerramentaOperacao_OperacaoId",
                table: "FerramentaOperacao",
                column: "OperacaoId");
        }
    }
}