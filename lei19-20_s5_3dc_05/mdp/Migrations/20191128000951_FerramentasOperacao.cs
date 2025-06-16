using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace mdp.Migrations
{
    public partial class FerramentasOperacao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ferramenta",
                table: "Operacoes");

            migrationBuilder.AddColumn<Guid>(
                name: "FerramentaId",
                table: "Operacoes",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Ferramenta",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Descricao = table.Column<string>(nullable: true),
                    TempoSetup = table.Column<long>(nullable: false),
                    TempoExecucao = table.Column<long>(nullable: false)
                },
                constraints: table => { table.PrimaryKey("PK_Ferramenta", x => x.Id); });

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
                name: "IX_Operacoes_FerramentaId",
                table: "Operacoes",
                column: "FerramentaId");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Operacoes_Ferramenta_FerramentaId",
                table: "Operacoes");

            migrationBuilder.DropTable(
                name: "FerramentaOperacao");

            migrationBuilder.DropTable(
                name: "Ferramenta");

            migrationBuilder.DropIndex(
                name: "IX_Operacoes_FerramentaId",
                table: "Operacoes");

            migrationBuilder.DropColumn(
                name: "FerramentaId",
                table: "Operacoes");

            migrationBuilder.AddColumn<string>(
                name: "Ferramenta",
                table: "Operacoes",
                nullable: true);
        }
    }
}