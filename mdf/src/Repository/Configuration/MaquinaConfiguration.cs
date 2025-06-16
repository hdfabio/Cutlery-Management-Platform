using mdf.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace mdf.Repository.Configuration
{
    public class MaquinaConfiguration : IEntityTypeConfiguration<Maquina>
    {
        public void Configure(EntityTypeBuilder<Maquina> builder)
        {
            builder.OwnsOne(m => m.Localizacao, a =>
                {
                    a.Property(p => p.Value)
                        .HasColumnName("Localizacao");
                }
            );
            builder.OwnsOne(m => m.Descricao, a =>
                {
                    a.Property(p => p.Value)
                        .HasColumnName("Descricao");
                }
            );
        }
    }
}