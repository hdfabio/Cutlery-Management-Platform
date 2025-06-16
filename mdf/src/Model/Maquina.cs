using mdf.Model.JoiningEntities;
using mdf.Model.Shared;
using mdf.Model.ValueObjects;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;

namespace mdf.Model
{
    public class Maquina : Entity, IAggregateRoot
    {
        public Localizacao Localizacao { get; set; }

        public TipoMaquina TipoMaquina { get; set; }

        public IList<LinhaProducaoMaquina> LinhaProducaoMaquinas { get; set; } = new List<LinhaProducaoMaquina>();

        public Maquina(string desc, string loc, TipoMaquina tipo) : base(desc)
        {
            Localizacao = new Localizacao
            {
                Value = loc
            };
            TipoMaquina = tipo;
        }

        protected Maquina()
        {
        }
    }
}