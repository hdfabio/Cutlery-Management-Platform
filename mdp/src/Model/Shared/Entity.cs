using mdp.Model.ValueObjects;
using System;

namespace mdp.Model.Shared
{
    /**
    Base class for entities 
    */
    public abstract class Entity
    {
        public Guid Id { get; set; }
        public Descricao Descricao { get; set; }

        protected Entity(string desc)
        {
            Descricao = new Descricao {Value = desc};
        }

        protected Entity()
        {
        }
    }
}