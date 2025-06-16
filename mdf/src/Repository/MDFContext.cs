using mdf.Model;
using mdf.Model.JoiningEntities;
using mdf.Repository.Configuration;
using Microsoft.EntityFrameworkCore;

namespace mdf.Repository
{
    public class MDFcontext : DbContext
    {
        public MDFcontext(DbContextOptions<MDFcontext> options)
            : base(options)
        {
        }

        public DbSet<Maquina> Maquinas { get; set; }

        public DbSet<Operacao> Operacoes { get; set; }

        public DbSet<TipoMaquina> TiposMaquinas { get; set; }

        public DbSet<LinhaProducao> LinhasProducao { get; set; }

        public DbSet<LinhaProducaoMaquina> LinhaProducaoMaquinas { get; set; }

        public DbSet<TipoMaquinaOperacao> TipoMaquinaOperacoes { get; set; }
        public DbSet<Ferramenta> Ferramentas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new MaquinaConfiguration());
            modelBuilder.ApplyConfiguration(new OperacaoConfiguration());
            modelBuilder.ApplyConfiguration(new LinhaProducaoMaquinaConfiguration());
            modelBuilder.ApplyConfiguration(new TipoMaquinaOperacoConfiguration());
            modelBuilder.ApplyConfiguration(new LinhaProducaoConfiguration());
            modelBuilder.ApplyConfiguration(new TipoMaquinaConfiguration());
            modelBuilder.ApplyConfiguration(new FerramentaConfiguration());
        }
    }
}