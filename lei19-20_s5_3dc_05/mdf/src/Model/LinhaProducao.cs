using mdf.Model.JoiningEntities;
using mdf.Model.Shared;
using System.Collections.Generic;

namespace mdf.Model
{
    /**
    Base class for entities 
    */
    public class LinhaProducao : Entity, IAggregateRoot
    {
        public IList<LinhaProducaoMaquina> LinhaProducaoMaquinas { get; set; }

        public LinhaProducao(string desc) : base(desc)
        {
            LinhaProducaoMaquinas = new List<LinhaProducaoMaquina>();
        }

        protected LinhaProducao()
        {
        }
    }
}