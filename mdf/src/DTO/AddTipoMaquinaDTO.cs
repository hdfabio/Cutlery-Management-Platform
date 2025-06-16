using System;
using System.Collections.Generic;

namespace mdf.DTO
{
    public class AddTipoMaquinaDTO
    {
        public List<Guid> ops { get; set; }
        public string descricao { get; set; }
    }
}