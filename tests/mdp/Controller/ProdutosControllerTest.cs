using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using mdp.Controllers;
using mdp.DTO;
using mdp.Model;
using mdp.Model.ValueObjects;
using mdp.Repository;
using Microsoft.AspNetCore.Mvc;
using Xunit;
using Xunit.Abstractions;

namespace tests.mdp.Controller
{
    public class ProdutosControllerTest
    {
        public ProdutosControllerTest(ITestOutputHelper output)
        {
            Output = output;
            Config = new ConfigTests();

            Ctx = Config.Context;
            Controller = new ProdutosController(Ctx);
        }

        private static readonly HttpClient Client = new HttpClient();

        private readonly ConfigTests Config;
        private readonly ProdutosController Controller;
        private readonly MDPContext Ctx;
        private readonly ITestOutputHelper Output;

        [Fact]
        public void DeleteProdutoTest()
        {
            var okRes = Controller.DeleteProduto(Ctx.Produtos.First().Id).Result as OkObjectResult;
            Assert.IsType<OkObjectResult>(okRes);

            var p = (Produto) okRes.Value;
            Assert.Null(Ctx.Produtos.Find(p.Id));
        }

        [Fact]
        public void getPlanoFabricoTest()
        {
            var okRes = Controller.GetPlanoDeFabrico(Ctx.Produtos.First().Id).Result as OkObjectResult;
            Assert.IsType<OkObjectResult>(okRes);

            var res = Controller.GetPlanoDeFabrico(Ctx.Produtos.First().Id);
            var value = res.Result as OkObjectResult;

            var valueValue = (PlanoFabrico) value.Value;
            Assert.NotNull(valueValue);

            var val = Ctx.PlanosFabrico.Find(valueValue.Id);
            Assert.NotNull(val);
        }

        [Fact]
        public void getProdutosTest()
        {
            var okRes = Controller.GetProdutos().Result as OkObjectResult;

            // Assert response type
            Assert.IsType<OkObjectResult>(okRes);

            // Assert response content
            var items = Assert.IsType<List<Produto>>(okRes.Value);
            Assert.True(items.Count != 0);
        }

        [Fact]
        public void getProdutoTest()
        {
            var okRes = Controller.GetProduto(Ctx.Produtos.First().Id).Result.Result as OkObjectResult;
            Assert.IsType<OkObjectResult>(okRes);

            var res = Controller.GetProduto(Ctx.Produtos.First().Id);
            var value = res.Result.Result as OkObjectResult;

            var valueValue = (Produto) value.Value;
            Assert.NotNull(valueValue);

            var val = Ctx.Produtos.Find(valueValue.Id);
            Assert.NotNull(val);
        }


        [Fact]
        public void MudarPlanoFabricoTest()
        {
            var p = Ctx.Produtos.FirstOrDefault();
            var pf = new PlanoFabrico
                {Descricao = new Descricao {Value = "Plano de fabrico x"}};
            Ctx.Add(pf);
            Ctx.SaveChanges();

            var plf = p.PlanoFabrico;

            var okRes = Controller.MudarPlanoFabrico(p.Id, pf.Id).Result as OkObjectResult;
            Assert.IsType<OkObjectResult>(okRes);

            p = (Produto) okRes.Value;

            Assert.NotEqual(plf, p.PlanoFabrico);
        }

        [Fact]
        public void NewProdutoTest()
        {
            var pdto = new ProdutoDTO();
            pdto.Descricao = "Plano de Fabrico Xpto";

            var pf = Ctx.PlanosFabrico.FirstOrDefault();
            Assert.IsType<PlanoFabrico>(pf);

            pdto.IdPlano = pf.Id;

            var result = Controller.NewProduto(pdto).Result as CreatedResult;
            Assert.IsType<CreatedResult>(result);

            var p = (Produto) result.Value;
            Output.WriteLine(p.Descricao.ToString());
            Output.WriteLine(p.PlanoFabrico.ToString());

            Assert.Equal(p.Descricao.ToString(), pdto.Descricao);
            Assert.Equal(p.PlanoFabrico.ToString(), pf.ToString());
        }
    }
}