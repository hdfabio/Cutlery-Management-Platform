using System;
using mdp.Model;
using mdp.Model.JoiningEntity;
using mdp.Model.ValueObjects;
using mdp.Repository;
using Microsoft.EntityFrameworkCore;

namespace tests.mdp
{
    public class ConfigTests
    {
        public MDPContext Context;

        public ConfigTests()
        {
            Init();
        }

        public void Init()
        {
            var optionsBuilder = new DbContextOptionsBuilder<MDPContext>()
                .UseInMemoryDatabase("TEST_DB")
                .Options;
            Context = new MDPContext(optionsBuilder);

            Context.Database.EnsureCreated();

            var op1 = new Operacao {Descricao = new Descricao {Value = "dsad"}, Execucao = new Duracao {Value = 23L}};
            Context.Operacoes.Add(op1);

            var pf1 = new PlanoFabrico
                {Descricao = new Descricao {Value = "PlanoFabrico"}};
            pf1.PlanoFabricoOperacoes.Add(new PlanoFabricoOperacoes
            {
                Operacao = op1,
                PlanoFabrico = pf1
            });
            Context.PlanosFabrico.Add(pf1);

            var produto = new Produto {PlanoFabrico = pf1, Descricao = new Descricao {Value = "Produto 1"}};
            Context.Produtos.Add(produto);

            Context.SaveChanges();
        }

        public DbContextOptions<MDPContext> CustomOptions()
        {
            return new DbContextOptionsBuilder<MDPContext>()
                .UseInMemoryDatabase(new Random().Next(int.MaxValue).ToString())
                .Options;
        }
    }
}