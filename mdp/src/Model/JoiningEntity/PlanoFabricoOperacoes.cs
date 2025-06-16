using System;

namespace mdp.Model.JoiningEntity
{
    public class PlanoFabricoOperacoes
    {
        public Guid PlanoFabricoId { get; set; }
        public PlanoFabrico PlanoFabrico { get; set; }

        public Guid OperacaoId { get; set; }
        public Operacao Operacao { get; set; }
    }
}