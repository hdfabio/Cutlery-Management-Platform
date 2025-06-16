using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace mdf.Migrations
{
    public partial class FerramentaEntity : Migration
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

            migrationBuilder.CreateIndex(
                name: "IX_Operacoes_FerramentaId",
                table: "Operacoes",
                column: "FerramentaId");

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