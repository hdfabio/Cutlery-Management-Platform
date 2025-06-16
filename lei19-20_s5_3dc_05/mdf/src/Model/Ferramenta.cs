using mdf.Model.JoiningEntities;
using mdf.Model.Shared;
using mdf.Model.ValueObjects;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Design;

namespace mdf.Model
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