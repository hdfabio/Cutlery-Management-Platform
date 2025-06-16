using System;

namespace mdf.DTO
{
    public class OperacaoDTO
    {
        public string descricao { get; set; }
        public string ferramenta { get; set; }
        public long duracao { get; set; }

        public long setup { get; set; }
    }
}