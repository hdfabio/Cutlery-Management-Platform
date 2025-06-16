using System.Collections.Generic;
using mdf.Model;
using mdf.Model.JoiningEntities;
using mdf.Model.ValueObjects;

namespace mdf.Repository
{
    public class DbInit
    {
        public static void Initialize(MDFcontext ctx)
        {
//            ctx.Database.EnsureDeleted();
//            ctx.Database.EnsureCreated();
//
//            var fer1 = new Ferramenta(205, 25, "Fer1");
//            var fer2 = new Ferramenta(45, 800, "Fer2");
//
//            ctx.Ferramentas.Add(fer1);
//            ctx.Ferramentas.Add(fer2);
//            
//            //Add operacoes
//            var op1 = new Operacao("Furar-Broca-500mm", 25, fer1);
//            var op2 = new Operacao("Furar-Broca-50mm", 15, fer2);
//
//            ctx.Operacoes.Add(op1);
//            ctx.Operacoes.Add(op2);
//
//            //Cria tipo de maquina e associa as operacoes 1 e 2
//            var tp = new TipoMaquina("New Tipo 1");
//
//            var tmo = new TipoMaquinaOperacao {Operacao = op1, TipoMaquina = tp};
//            var tmo1 = new TipoMaquinaOperacao {Operacao = op2, TipoMaquina = tp};
//
//            tp.TipoMaquinaOperacoes.Add(tmo);
//            tp.TipoMaquinaOperacoes.Add(tmo1);
//
//            ctx.TiposMaquinas.Add(tp);
//
//            //Cria Maquina e Associa Tipo de Maquina
//            var m = new Maquina("maq 10", "li", tp);
//
//            //Cria linha de producao
//            var listMaquinas = new LinkedList<Maquina>();
//            listMaquinas.AddLast(m);
//            ctx.Maquinas.Add(m);
//
//            var linha = new LinhaProducao("Linha de Producao 1");
//
//            //Associacao LinhaProducao e Maquina
//            var lpm1 = new LinhaProducaoMaquina {Maquina = m, LinhaProducao = linha};
//
//            linha.LinhaProducaoMaquinas.Add(lpm1);
//
//            ctx.LinhasProducao.Add(linha);
//            ctx.LinhaProducaoMaquinas.Add(lpm1);
//
//            ctx.SaveChanges();
        }
    }
}