using mdf.Controllers;
using mdf.DTO;
using mdf.Model;
using mdf.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;
using Xunit.Abstractions;

namespace tests.mdf.Controller
{
    public class OperacaoControllerTest
    {
        public OperacaoControllerTest(ITestOutputHelper output)
        {
            Output = output;

            Config = new ConfigTests();

            Ctx = Config.Context;
            Controller = new OperacaoController(Ctx);
        }

        private readonly ConfigTests Config;
        private readonly MDFcontext Ctx;
        private readonly ITestOutputHelper Output;
        private OperacaoController Controller;

        [Fact]
        public async void AddOperacaoTest()
        {
            var options = new DbContextOptionsBuilder<MDFcontext>()
                .UseInMemoryDatabase("AddOperacaoTest")
                .Options;
            IActionResult res = null;
            Ferramenta fer = null;

            using (var ctx = new MDFcontext(options))
            {
                var nController = new OperacaoController(ctx);

                fer = Ctx.Ferramentas.First();
                var opdto = new OperacaoDTO
                {
                    descricao = "new op", duracao = 250, ferramenta = fer.Descricao.Value, setup = fer.Setup.Value
                };
                res = await nController.AddOperacao(opdto);
                Assert.IsType<CreatedResult>(res);
            }

            fer = Ctx.Ferramentas.First();

            var op = new OperacaoDTO
            {
                descricao = "NEWOP",
                duracao = 9999L,
                ferramenta = "New Tool",
                setup = 300L
            };

            res = Controller.AddOperacao(op).Result as CreatedResult;
            Assert.IsType<CreatedResult>(res);
        }

        [Fact]
        public async void DeleteOperacaoTest()
        {
            var nres = await Controller.DeleteOperacao(new Guid());
            Assert.IsType<NotFoundObjectResult>(nres);

            var operacao = Ctx.Operacoes.First().Id;
            var res = Controller.GetOperacao(operacao);

            var res1 = Controller.DeleteOperacao(operacao);
            var va = res1.Result as OkObjectResult;
            Assert.IsType<OkObjectResult>(va);

            var p = (Operacao) va.Value;
            Assert.Null(Ctx.Operacoes.Find(p.Id));

            Output.WriteLine(res1.Result.ToString());
        }

        [Fact]
        public async void GetOperacaoTest()
        {
            var nres = await Controller.GetOperacao(new Guid());
            Assert.IsType<NotFoundResult>(nres);

            var res = Controller.GetOperacao(Ctx.Operacoes.First().Id);
            var value = res.Result as OkObjectResult;

            var valueValue = (Operacao) value.Value;
            Assert.NotNull(valueValue);

            var val = Ctx.Operacoes.Find(valueValue.Id);
            Assert.NotNull(val);
        }

        [Fact]
        public async void GetOperacoesTest()
        {
            var options = new DbContextOptionsBuilder<MDFcontext>()
                .UseInMemoryDatabase("GetOperacoesTest")
                .Options;


            using (var ctx = new MDFcontext(options))
            {
                Controller = new OperacaoController(ctx);

                var res = await Controller.GetOperacoes();
                Assert.IsType<NoContentResult>(res);
            }

            Controller = new OperacaoController(Config.Context);

            var nres = Controller.GetOperacoes().Result as OkObjectResult;
            Assert.IsType<OkObjectResult>(nres);

            var list = (List<Operacao>) nres.Value;
            Assert.NotEmpty(list);
        }
    }
}