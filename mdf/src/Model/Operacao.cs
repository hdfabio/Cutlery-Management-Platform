using mdf.Model.JoiningEntities;
using mdf.Model.Shared;
using mdf.Model.ValueObjects;
using System.Collections.Generic;

namespace mdf.Model
{
    public class Operacao : Entity, IAggregateRoot
    {
        public Duracao Execucao { get; set; }
        public Ferramenta Ferramenta { get; set; }

        public IList<TipoMaquinaOperacao> TipoMaquinaOperacoes { get; set; } = new List<TipoMaquinaOperacao>();

        public override string ToString()
        {
            return Id + " : " + Descricao + " : " + Execucao;
        }

        public Operacao(string desc, long dur, Ferramenta ferramenta) : base(desc)
        {
            Execucao = new Duracao
            {
                Value = dur
            };
            Ferramenta = ferramenta;
        }

        protected Operacao()
        {
        }
    }
}