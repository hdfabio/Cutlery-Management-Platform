using mdp.Model;
using mdp.Model.JoiningEntity;
using mdp.Repository.Configuration;
using Microsoft.EntityFrameworkCore;

namespace mdp.Repository
{
    public class MDPContext : DbContext
    {
        public MDPContext(DbContextOptions<MDPContext> options)
            : base(options)
        {
        }

        public DbSet<PlanoFabrico> PlanosFabrico { get; set; }
        public DbSet<Operacao> Operacoes { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<PlanoFabricoOperacoes> PlanoFabricoOperacoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new PlanoFabricoOperacaoConfiguration());
            modelBuilder.ApplyConfiguration(new OperacaoConfiguration());
            modelBuilder.ApplyConfiguration(new PlanoFabricoConfiguration());
            modelBuilder.ApplyConfiguration(new ProdutoConfiguration());
            modelBuilder.ApplyConfiguration(new FerramentaConfiguration());
        }
    }
}