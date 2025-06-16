using mdf.Model;
using mdf.Model.JoiningEntities;
using mdf.Repository;
using mdf.Services;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace tests.mdf
{
    public class ConfigTests
    {
        public MDFcontext Context;

        public ConfigTests()
        {
            Context = Init();
        }

        public MDFcontext Init()
        {
            MDFcontext _ctx;

            var optionsBuilder = new DbContextOptionsBuilder<MDFcontext>()
                .UseInMemoryDatabase("TEST_DB")
                .Options;
            _ctx = new MDFcontext(optionsBuilder);

            _ctx.Database.EnsureCreated();

            var fer1 = new Ferramenta(25, "New Fer");
            var fer2 = new Ferramenta(250, "New Fer 2");
            _ctx.Ferramentas.Add(fer1);
            _ctx.Ferramentas.Add(fer2);

            //Add operacoes
            var op1 = new Operacao("Furar-Broca-500mm", 25, fer1);
            var op2 = new Operacao("Desbastar", 205, fer2);

            _ctx.Operacoes.Add(op1);
            _ctx.Operacoes.Add(op2);

            //Cria tipo de maquina e associa as operacoes 1 e 2
            var tp = new TipoMaquina("Novo Tipo 1");

            var tmo1 = new TipoMaquinaOperacao {Operacao = op1, TipoMaquina = tp};
            var tmo2 = new TipoMaquinaOperacao {Operacao = op2, TipoMaquina = tp};

            tp.TipoMaquinaOperacoes.Add(tmo1);
            tp.TipoMaquinaOperacoes.Add(tmo2);

            _ctx.TipoMaquinaOperacoes.Add(tmo1);
            _ctx.TipoMaquinaOperacoes.Add(tmo2);

            _ctx.TiposMaquinas.Add(tp);

            //Cria Operacao e Associa Tipo de Operacao
            var m = new Maquina("nova maq", "Ali na esquininha", tp);

            var listMaquinas = new LinkedList<Maquina>();
            listMaquinas.AddLast(m);

            var serv = new LinhaProducaoService(_ctx);
            serv.SaveLinhaProducao("Nova Linha", listMaquinas);

            _ctx.SaveChanges();
            return _ctx;
        }
    }
}