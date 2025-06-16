using mdp.Model.Shared;

namespace mdp.Model
{
    public class Produto : Entity, IAggregateRoot
    {
        public PlanoFabrico PlanoFabrico { get; set; }

        public Produto(string desc, PlanoFabrico plano) : base(desc)
        {
            PlanoFabrico = plano;
        }

        public Produto()
        {
        }
    }
}