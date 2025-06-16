using System;

namespace mdf.DTO
{
    public class MaquinaDTO
    {
        public string descricao { get; set; }
        public string localizacao { get; set; }
        public Guid tipoMaquina { get; set; }
    }
}