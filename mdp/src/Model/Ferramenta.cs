using mdp.Model.Shared;
using mdp.Model.ValueObjects;

namespace mdp.Model
{
    public class Ferramenta : Entity
    {
        protected Ferramenta()
        {
        }

        public Ferramenta(long setup, string desc) : base(desc)
        {
            Setup = new Duracao
            {
                Value = setup
            };
        }

        public Duracao Setup { get; set; }
    }
}