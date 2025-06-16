using mdf.Controllers;
using mdf.DTO;
using mdf.Model;
using mdf.Repository;
using mdf.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;
using Xunit.Abstractions;

namespace tests.mdf.Controller
{
    public class LinhaProducaoControllerTest
    {
        public LinhaProducaoControllerTest(ITestOutputHelper output)
        {
            Output = output;
            Config = new ConfigTests();
            Ctx = Config.Context;
            Controller = new LinhaProducaoController(Ctx);
        }

        private readonly ConfigTests Config;
        private readonly MDFcontext Ctx;
        private ITestOutputHelper Output;
        private LinhaProducaoController Controller;

        [Fact]
        public async void AddMaquinaTest()
        {
            using (var ctx = new ConfigTests().Init())
            {
                Controller = new LinhaProducaoController(ctx);

                var serv = new LinhaProducaoService(ctx);
                var linhaP = await serv.SaveLinhaProducao("Linha vazia", new LinkedList<Maquina>());

                var maq = new Maquina("maquina teste 1", "ali jcawoiejf", ctx.TiposMaquinas.First());

                ctx.Maquinas.Add(maq);
                ctx.SaveChanges();

                var okRes = await Controller.AddMaquina(new AddMaquinaDTO
                {
                    mq = maq.Id,
                    lp = linhaP.Id
                });
                Assert.IsType<OkObjectResult>(okRes);
            }
        }

        [Fact]
        public void CreateLinhaProducaoTest()
        {
            var m = Ctx.Maquinas.FirstOrDefault();

            var listMaquinas = new List<Guid> {m.Id};

            var dto = new CreateLinhaProducaoDTO
            {
                descricao = "new linha random",
                lp = listMaquinas
            };

            //  var linha = new LinhaProducao {Id = guid, ListMaquinas = listMaquinas};

            var okRes = Controller.CreateLinhaProducao(dto).Result as CreatedResult;
            Assert.IsType<CreatedResult>(okRes);

            var l = okRes.Value as LinhaProducao;
            Assert.NotNull(l);

            Assert.NotEmpty(Ctx.LinhasProducao);
        }

        [Fact]
        public async void DeleteLinhaProducaoTest()
        {
            var nres = await Controller.DeleteLinhaProducao(new Guid());
            Assert.IsType<NotFoundObjectResult>(nres);

            var tp = Ctx.LinhasProducao.First().Id;
            var res = Controller.GetLinhaProducao(tp);

            var res1 = Controller.DeleteLinhaProducao(tp);
            var va = res1.Result as OkObjectResult;
            Assert.IsType<OkObjectResult>(va);


            var p = (LinhaProducao) va.Value;
            Assert.Null(Ctx.LinhasProducao.Find(p.Id));
        }

        [Fact]
        public void getLinhaproducaoTest()
        {
            var okRes = Controller.GetLinhaProducao(Ctx.LinhasProducao.First().Id).Result as OkObjectResult;
            Assert.IsType<OkObjectResult>(okRes);

            // Assert response content
            Assert.IsType<LinhaProducao>(okRes.Value);
        }

        [Fact]
        public void getLinhasProducaoTest()
        {
            var okRes = Controller.GetLinhasProducao().Result as OkObjectResult;

            // Assert response type
            Assert.IsType<OkObjectResult>(okRes);

            // Assert response content
            var items = Assert.IsType<List<LinhaProducao>>(okRes.Value);
            Assert.True(items.Count != 0);
        }
    }
}