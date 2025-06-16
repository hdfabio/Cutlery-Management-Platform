using mdp.Model.JoiningEntity;
using mdp.Model.Shared;
using mdp.Model.ValueObjects;
using System.Collections.Generic;

namespace mdp.Model
{
    public class Operacao : Entity, IAggregateRoot
    {
        public Duracao Execucao { get; set; }

        public Ferramenta Ferramenta { get; set; }

        public IList<PlanoFabricoOperacoes> PlanoFabricoOperacoes { get; set; } = new List<PlanoFabricoOperacoes>();

        public override string ToString()
        {
            return Id + " : " + Descricao + " : " + Execucao;
        }

        public Operacao(string desc, long dur, Ferramenta ferramenta) : base(desc)
        {
            Execucao = new Duracao {Value = dur};
            Ferramenta = ferramenta;
        }

        public Operacao()
        {
        }
    }
}