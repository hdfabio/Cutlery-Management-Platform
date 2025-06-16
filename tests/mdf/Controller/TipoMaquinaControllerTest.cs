using mdf.Controllers;
using mdf.DTO;
using mdf.Model;
using mdf.Model.JoiningEntities;
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
    public class TipoMaquinaControllerTest
    {
        public TipoMaquinaControllerTest(ITestOutputHelper output)
        {
            _output = output;

            _config = new ConfigTests();

            _ctx = _config.Context;
            _controller = new TipoMaquinaController(_ctx);
        }

        private readonly ConfigTests _config;
        private readonly MDFcontext _ctx;
        private readonly ITestOutputHelper _output;
        private TipoMaquinaController _controller;

        [Fact]
        public async void DeleteTipoMaquinaTest()
        {
            var nres = await _controller.DeleteTipoMaquina(new Guid());
            Assert.IsType<NotFoundObjectResult>(nres);

            var tp = _ctx.TiposMaquinas.First().Id;


            var res1 = _controller.DeleteTipoMaquina(tp);
            var va = res1.Result as OkObjectResult;
            Assert.IsType<OkObjectResult>(va);


            var p = (TipoMaquina) va.Value;
            Assert.Null(_ctx.TiposMaquinas.Find(p.Id));
        }

        [Fact]
        public async void TestAddOperacao()
        {
            var tipoMaquina = new TipoMaquina("Tipo DE Teste");
            await _ctx.TiposMaquinas.AddAsync(tipoMaquina);
            await _ctx.SaveChangesAsync();

            var ops = await _ctx.Operacoes.ToListAsync();

            var opIds = new List<Guid>();

            ops.ForEach(op => { opIds.Add(op.Id); });

            var add = new AddOperacaoDTO {op = opIds[0], tp = tipoMaquina.Id};

            var res = await _controller.AddOperacao(add);
            Assert.IsType<OkObjectResult>(res);

            res = await _controller.AddOperacao(add);
            Assert.IsType<BadRequestObjectResult>(res);

            add = new AddOperacaoDTO {op = new Guid(), tp = tipoMaquina.Id};
            res = await _controller.AddOperacao(add);
            Assert.IsType<NotFoundObjectResult>(res);
        }

        [Fact]
        public async void TestCreateTipoMaquina()
        {
            _controller = new TipoMaquinaController(_ctx);
            var op = _ctx.Operacoes.First();

            var list = new List<Guid>();

            var res = await _controller.CreateTipoMaquina(new AddTipoMaquinaDTO
            {
                descricao = "Novo Tipo Maquina",
                ops = list
            });
            Assert.IsType<BadRequestObjectResult>(res);

            list.Add(op.Id);

            res = await _controller.CreateTipoMaquina(new AddTipoMaquinaDTO
            {
                descricao = "Novo Tipo Maquina",
                ops = list
            });
            Assert.IsType<CreatedResult>(res);
        }

        [Fact]
        public async void TestEditOperacao()
        {
            var tipoMaquina = _ctx.TiposMaquinas.First();
            var ops = await _ctx.Operacoes.ToListAsync();

            var opIds = new List<Guid>();

            var res = await _controller.EditOperacao(tipoMaquina.Id, opIds);
            Assert.IsType<NoContentResult>(res);

            opIds.Clear();

            ops.ForEach(op => { opIds.Add(op.Id); });

            res = await _controller.EditOperacao(tipoMaquina.Id, opIds);
            Assert.IsType<OkObjectResult>(res);

            var listActual = tipoMaquina.TipoMaquinaOperacoes.Select(tmo => tmo.Operacao);

            Assert.Equal(ops, listActual);

            res = await _controller.EditOperacao(new Guid("6ee2cf50-150a-4457-a90d-60e101fa2a6c"), opIds);
            Assert.IsType<NotFoundObjectResult>(res);
        }

        [Fact]
        public void TestGetOperacoesTipoMaquina()
        {
            var tm = _ctx.TiposMaquinas.FirstOrDefault().Id;

            var okRes = _controller.GetOperacoesTipoMaquina(tm).Result as OkObjectResult;
            Assert.IsType<OkObjectResult>(okRes);
        }

        [Fact]
        public async void TestGetTipoMaquina()
        {
            var options = new DbContextOptionsBuilder<MDFcontext>()
                .UseInMemoryDatabase("TestGetTipoMaquina")
                .Options;


            using (var ctx = new MDFcontext(options))
            {
                _controller = new TipoMaquinaController(ctx);

                var res = await _controller.GetTipoMaquina(_ctx.TiposMaquinas.First().Id);
                Assert.IsType<NotFoundObjectResult>(res);
            }

            _controller = new TipoMaquinaController(_ctx);

            var nr = await _controller.GetTipoMaquina(_ctx.TiposMaquinas.First().Id);
            Assert.IsType<OkObjectResult>(nr);
        }

        [Fact]
        public async void TestGetTiposMaquina()
        {
            var options = new DbContextOptionsBuilder<MDFcontext>()
                .UseInMemoryDatabase("testGetTiposMaquina")
                .Options;

            using (var ctx = new MDFcontext(
                options))
            {
                _controller = new TipoMaquinaController(ctx);

                var res = await _controller.GetTiposMaquina();
                Assert.IsType<NoContentResult>(res);
                _output.WriteLine(res.ToString());

                var fer = _ctx.Ferramentas.First();

                var tp = new TipoMaquina("Tipo de teste 2");
                var op = new Operacao("Nova Op", 250, fer);

                var tmo = new TipoMaquinaOperacao {Operacao = op, TipoMaquina = tp};

                tp.TipoMaquinaOperacoes.Add(tmo);

                ctx.TiposMaquinas.Add(tp);
                ctx.TipoMaquinaOperacoes.Add(tmo);

                ctx.SaveChanges();

                res = await _controller.GetTiposMaquina();
                Assert.IsType<OkObjectResult>(res);
            }
        }
    }
}