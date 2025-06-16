using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace mdf.Migrations
{
    public partial class UpdateFerramenta : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Operacoes_Ferramenta_FerramentaId",
                table: "Operacoes");

            migrationBuilder.DropTable(
                name: "FerramentaOperacao");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ferramenta",
                table: "Ferramenta");

            migrationBuilder.RenameTable(
                name: "Ferramenta",
                newName: "Ferramentas");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ferramentas",
                table: "Ferramentas",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Operacoes_Ferramentas_FerramentaId",
                table: "Operacoes",
                column: "FerramentaId",
                principalTable: "Ferramentas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Operacoes_Ferramentas_FerramentaId",
                table: "Operacoes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ferramentas",
                table: "Ferramentas");

            migrationBuilder.RenameTable(
                name: "Ferramentas",
                newName: "Ferramenta");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ferramenta",
                table: "Ferramenta",
                column: "Id");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Operacoes_Ferramenta_FerramentaId",
                table: "Operacoes",
                column: "FerramentaId",
                principalTable: "Ferramenta",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}