using mdf.Model.JoiningEntities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace mdf.Repository.Configuration
{
    public class TipoMaquinaOperacoConfiguration : IEntityTypeConfiguration<TipoMaquinaOperacao>
    {
        public void Configure(EntityTypeBuilder<TipoMaquinaOperacao> builder)
        {
            builder.HasKey(lpm => new {lpm.OperacaoId, lpm.TipoMaquinaId});
        }
    }
}