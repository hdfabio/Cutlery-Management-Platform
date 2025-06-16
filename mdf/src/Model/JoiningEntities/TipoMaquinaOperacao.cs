using System;

namespace mdf.Model.JoiningEntities
{
    public class TipoMaquinaOperacao
    {
        public TipoMaquina TipoMaquina;
        public Guid TipoMaquinaId { get; set; }

        public Guid OperacaoId { get; set; }
        public Operacao Operacao { get; set; }
    }
}