using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace mdp.Migrations
{
    public partial class InitialMiggration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                "PlanosFabrico",
                table => new
                {
                    Id = table.Column<Guid>(),
                    Descricao = table.Column<string>(maxLength: 300, nullable: true, defaultValue: "")
                },
                constraints: table => { table.PrimaryKey("PK_PlanosFabrico", x => x.Id); });

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

            migrationBuilder.CreateTable(
                "Produtos",
                table => new
                {
                    Id = table.Column<Guid>(),
                    Descricao = table.Column<string>(nullable: true),
                    PlanoFabricoId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produtos", x => x.Id);
                    table.ForeignKey(
                        "FK_Produtos_PlanosFabrico_PlanoFabricoId",
                        x => x.PlanoFabricoId,
                        "PlanosFabrico",
                        "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                "IX_OperacaoDTO_PlanoFabricoId",
                "OperacaoDTO",
                "PlanoFabricoId");

            migrationBuilder.CreateIndex(
                "IX_Produtos_PlanoFabricoId",
                "Produtos",
                "PlanoFabricoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                "OperacaoDTO");

            migrationBuilder.DropTable(
                "Produtos");

            migrationBuilder.DropTable(
                "PlanosFabrico");
        }
    }
}