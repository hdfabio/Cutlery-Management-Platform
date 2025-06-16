using mdf.Model.JoiningEntities;
using mdf.Model.Shared;
using System.Collections.Generic;

namespace mdf.Model
{
    public class TipoMaquina : Entity, IAggregateRoot
    {
        public IList<TipoMaquinaOperacao> TipoMaquinaOperacoes { get; set; } = new List<TipoMaquinaOperacao>();

        public TipoMaquina(string desc) : base(desc)
        {
        }

        protected TipoMaquina()
        {
        }
    }
}