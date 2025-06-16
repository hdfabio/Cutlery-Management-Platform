using mdp.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace mdp.Repository.Configuration
{
    public class ProdutoConfiguration : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> builder)
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