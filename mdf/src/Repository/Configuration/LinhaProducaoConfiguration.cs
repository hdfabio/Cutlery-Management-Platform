using mdf.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace mdf.Repository.Configuration
{
    public class LinhaProducaoConfiguration : IEntityTypeConfiguration<LinhaProducao>
    {
        public void Configure(EntityTypeBuilder<LinhaProducao> builder)
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