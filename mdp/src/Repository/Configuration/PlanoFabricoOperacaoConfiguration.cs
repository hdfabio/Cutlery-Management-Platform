using mdp.Model.JoiningEntity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace mdp.Repository.Configuration
{
    public class PlanoFabricoOperacaoConfiguration : IEntityTypeConfiguration<PlanoFabricoOperacoes>
    {
        public void Configure(EntityTypeBuilder<PlanoFabricoOperacoes> builder)
        {
            builder.HasKey(pfo =>
                new
                {
                    pfo.OperacaoId,
                    pfo.PlanoFabricoId
                });
        }
    }
}