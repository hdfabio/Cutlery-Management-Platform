using mdf.Model.JoiningEntities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace mdf.Repository.Configuration
{
    public class LinhaProducaoMaquinaConfiguration : IEntityTypeConfiguration<LinhaProducaoMaquina>
    {
        public void Configure(EntityTypeBuilder<LinhaProducaoMaquina> builder)
        {
            builder.HasKey(lpm => new {lpm.MaquinaId, lpm.LinhaProducaoId});

            builder.HasOne(lpm => lpm.Maquina)
                .WithMany(m => m.LinhaProducaoMaquinas)
                .HasForeignKey(lpm => lpm.MaquinaId);

            builder.HasOne(lpm => lpm.LinhaProducao)
                .WithMany(lp => lp.LinhaProducaoMaquinas)
                .HasForeignKey(lpm => lpm.LinhaProducaoId);
        }
    }
}