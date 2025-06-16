using mdp.Model.JoiningEntity;
using mdp.Model.Shared;
using System.Collections.Generic;
using mdp.DTO;

namespace mdp.Model
{
    public class PlanoFabrico : Entity, IAggregateRoot
    {
        public IList<PlanoFabricoOperacoes> PlanoFabricoOperacoes { get; set; } = new List<PlanoFabricoOperacoes>();

        public PlanoFabrico(string desc) : base(desc)
        {
        }

        public PlanoFabrico()
        {
        }
    }
}