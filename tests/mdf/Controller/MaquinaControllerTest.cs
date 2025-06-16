using mdf.Controllers;
using mdf.DTO;
using mdf.Model;
using mdf.Repository;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;
using Xunit.Abstractions;

namespace tests.mdf.Controller
{
    public class MaquinaControllerTest
    {
        public MaquinaControllerTest(ITestOutputHelper output)
        {
            Output = output;

            Config = new ConfigTests();

            Ctx = Config.Context;
            Controller = new MaquinaController(Ctx);
        }

        private readonly ConfigTests Config;
        private readonly MDFcontext Ctx;
        private readonly ITestOutputHelper Output;
        private readonly MaquinaController Controller;

        [Fact]
        public void AlterarTipoMaquinaTest()
        {
            var maq = Ctx.Maquinas.FirstOrDefault();
            var tm = new TipoMaquina("Tipo Teste");
            Ctx.Add(tm);
            Ctx.SaveChanges();

            var tipoOrig = maq.TipoMaquina;

            var res = Controller.AlterarTipoMaquina(maq.Id, tm.Id).Result;
            Assert.IsType<OkObjectResult>(res);

            //            maq = (Operacao) res.Value;
            //
            //            Assert.NotEqual(tipoOrig, maq.TipoMaquina);
        }

        [Fact]
        public async void DeleteMaquinaTest()
        {
            var nres = await Controller.DeleteMaquina(new Guid());
            Assert.IsType<NotFoundObjectResult>(nres);

            var maquina = Ctx.Maquinas.First().Id;
            var res = Controller.GetMaquina(maquina);

            var res1 = Controller.DeleteMaquina(maquina);
            var va = res1.Result as OkObjectResult;
            Assert.IsType<OkObjectResult>(va);

            var p = (Maquina) va.Value;
            Assert.Null(Ctx.Maquinas.Find(p.Id));

            Output.WriteLine(res1.Result.ToString());
        }

        [Fact]
        public void GetMaquinaIdTest()
        {
            var result = Controller.GetMaquina(Ctx.Maquinas.First().Id).Result as OkObjectResult;
            Assert.IsType<OkObjectResult>(result);

            // Assert response content
            var items = Assert.IsType<Maquina>(result.Value);
            Assert.NotNull(items);
        }

        [Fact]
        public void GetMaquinasTest()
        {
            var result = Controller.GetMaquinas().Result as OkObjectResult;

            // Assert response type
            Assert.IsType<OkObjectResult>(result);

            // Assert response content
            var items = Assert.IsType<List<Maquina>>(result.Value);
            Assert.True(items.Count != 0);
        }

        [Fact]
        public void GetMaquinasTipoMaquinaTest()
        {
            var tm = Ctx.TiposMaquinas.FirstOrDefault().Id;
            var mtm = Ctx.Maquinas.Where(x => x.TipoMaquina.Id == tm).ToList();

            var okRes = Controller.GetMaquinasTipoMaquina(tm).Result as OkObjectResult;
            Assert.IsType<OkObjectResult>(okRes);

            var listaMaquinasRecebida = okRes.Value as List<Maquina>;

            Assert.Equal(mtm, listaMaquinasRecebida);
        }

        [Fact]
        public void NovaMaquinaTest()
        {
            var m = new MaquinaDTO();
            m.localizacao = "IDC";

            var tm = Ctx.TiposMaquinas.FirstOrDefault();

            m.tipoMaquina = tm.Id;
            m.descricao = "TEST";

            var result = Controller.NovaMaquina(m).Result as CreatedResult;
            Assert.IsType<CreatedResult>(result);

            var maq = (Maquina) result.Value;
            Output.WriteLine(maq.Localizacao.ToString());
            Output.WriteLine(maq.TipoMaquina.ToString());

            Assert.Equal(maq.Localizacao.ToString(), m.localizacao);
            Assert.Equal(maq.TipoMaquina.ToString(), tm.ToString());
        }
    }
}