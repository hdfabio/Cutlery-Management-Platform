using mdp.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace mdp.Repository.Configuration
{
    public class OperacaoConfiguration : IEntityTypeConfiguration<Operacao>
    {
        public void Configure(EntityTypeBuilder<Operacao> builder)
        {
            builder.OwnsOne(m => m.Descricao, a =>
                {
                    a.Property(p => p.Value).HasMaxLength(300)
                        .HasColumnName("Descricao");
                }
            );

            builder.OwnsOne(m => m.Execucao, a =>
                {
                    a.Property(p => p.Value)
                        .HasColumnName("Execucao");
                }
            );
        }
    }
}