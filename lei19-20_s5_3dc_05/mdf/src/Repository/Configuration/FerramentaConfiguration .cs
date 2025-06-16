using mdf.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace mdf.Repository.Configuration
{
    public class FerramentaConfiguration : IEntityTypeConfiguration<Ferramenta>
    {
        public void Configure(EntityTypeBuilder<Ferramenta> builder)
        {
            builder.OwnsOne(m => m.Descricao, a =>
                {
                    a.Property(p => p.Value)
                        .HasColumnName("Descricao");
                }
            );

            builder.OwnsOne(m => m.Setup, a =>
                {
                    a.Property(p => p.Value)
                        .HasColumnName("TempoSetup");
                }
            );
        }
    }
}