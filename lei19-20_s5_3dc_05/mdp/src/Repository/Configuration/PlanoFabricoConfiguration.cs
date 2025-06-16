using mdp.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace mdp.Repository.Configuration
{
    public class PlanoFabricoConfiguration : IEntityTypeConfiguration<PlanoFabrico>
    {
        public void Configure(EntityTypeBuilder<PlanoFabrico> builder)
        {
            builder.OwnsOne(m => m.Descricao, a =>
                {
                    a.Property(p => p.Value).HasMaxLength(300)
                        .HasColumnName("Descricao")
                        .HasDefaultValue("");
                }
            );
        }
    }
}