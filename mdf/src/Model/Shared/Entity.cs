using mdf.Model.ValueObjects;
using System;

namespace mdf.Model.Shared
{
    /**
    Base class for entities 
    */
    public abstract class Entity
    {
        public Guid Id { get; set; }
        public Descricao Descricao { get; set; }

        public Entity(string desc)
        {
            if (string.IsNullOrEmpty(desc)) throw new ArgumentException("Invalid descriptionl");

            Descricao = new Descricao {Value = desc};
        }

        protected Entity()
        {
        }
    }
}