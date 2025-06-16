using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using mdp.Controllers;
using mdp.DTO;
using mdp.Model;
using mdp.Repository;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Xunit;
using Xunit.Abstractions;

namespace tests.mdp.Controller
{
    public class PlanoFabricoTest
    {
        private static readonly HttpClient Client = new HttpClient();

        private readonly ConfigTests Config;
        private PlanoFabricoController Controller;
        private readonly MDPContext Ctx;
        private readonly ITestOutputHelper Output;

        public PlanoFabricoTest(ITestOutputHelper output)
        {
            Output = output;
            Config = new ConfigTests();

            Ctx = Config.Context;
            Controller = new PlanoFabricoController(Ctx);
        }

        [Fact]
        public async void DeleteOperacaoPlanoFabrico()
        {
            var nres = await Controller.DeleteOperacao(new Guid(), new Guid());
            Assert.IsType<NotFoundResult>(nres);


            var pl = Ctx.PlanosFabrico.First();
//            Output.WriteLine(pl.Operacoes.First().ToString());

            var op = Ctx.Operacoes.First();


            var res1 = Controller.DeleteOperacao(pl.Id, op.Id);
            var va = res1.Result as OkObjectResult;
            Assert.IsType<OkObjectResult>(va);
        }

        [Fact]
        public async void GetPlanoFabrico()
        {
            var nc = await Controller.GetPlanoFabrico(new Guid());
            Assert.IsType<NotFoundObjectResult>(nc);

            var pl = Ctx.PlanosFabrico.FirstOrDefault();
            var ok = Controller.GetPlanoFabrico(pl.Id).Result as OkObjectResult;
            Assert.IsType<OkObjectResult>(ok);

            var okValue = (PlanoFabrico) ok.Value;
            Assert.NotNull(okValue);
            Assert.IsType<PlanoFabrico>(okValue);
        }

        [Fact]
        public void GetPlanosFabrico()
        {
            using (var ctx = new MDPContext(Config.CustomOptions()))
            {
                Controller = new PlanoFabricoController(ctx);

                var res = Controller.GetPlanosFabrico().Result as NoContentResult;

                Assert.IsType<NoContentResult>(res);
            }

            Controller = new PlanoFabricoController(Ctx);
            var cres = Controller.GetPlanosFabrico().Result as OkObjectResult;

            Assert.IsType<OkObjectResult>(cres);

            var value = (List<PlanoFabrico>) cres.Value;
            Assert.NotNull(value);
            Assert.NotEmpty(value);

            Output.WriteLine(value.Aggregate("", (current, pl) => current + ("\n-> " + pl)));
        }

        [Fact]
        public async void NovoPlanoFabricoTest()
        {
            var operacoes =
                await Client.GetStringAsync("https://localhost:5001/api/operacao/");

            var list = JsonConvert.DeserializeObject<List<Operacao>>(operacoes);
            Assert.NotNull(list);

            var plDTO = new PlanoFabricoDTO
            {
                descricao = "NewPlano", operacoes = new List<Guid>()
            };
            plDTO.operacoes.Add(list.First().Id);
            Assert.NotNull(plDTO);

            var plDTO1 = new PlanoFabricoDTO
            {
                descricao = "NewPlano", operacoes = new List<Guid>()
            };
            plDTO1.operacoes.Add(list.Last().Id);
            Assert.NotNull(plDTO1);

            var pl1 = Controller.NovoPlanoFabrico(plDTO).Result;
            Assert.NotNull(pl1);
            Assert.IsType<CreatedResult>(pl1);

            var pl2 = await Controller.NovoPlanoFabrico(plDTO1);
            Assert.NotNull(pl2);
            Assert.IsType<CreatedResult>(pl2);
        }

        [Fact]
        public async void PostOperacao()
        {
            var pl = Ctx.PlanosFabrico.First();

            var operacoes =
                await Client.GetStringAsync("https://localhost:5001/api/operacao/");

            var list = JsonConvert.DeserializeObject<List<Operacao>>(operacoes);

            var op = list.Last();

            var res = await Controller.PostOperacao(pl.Id, op.Id);
            Assert.IsType<CreatedResult>(res);
        }
    }
}