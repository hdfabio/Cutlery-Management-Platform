using mdf.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace mdf.Repository.Configuration
{
    public class TipoMaquinaConfiguration : IEntityTypeConfiguration<TipoMaquina>
    {
        public void Configure(EntityTypeBuilder<TipoMaquina> builder)
        {
            builder.OwnsOne(m => m.Descricao, a =>
                {
                    a.Property(p => p.Value)
                        .HasColumnName("Descricao");
                }
            );
        }
    }
}