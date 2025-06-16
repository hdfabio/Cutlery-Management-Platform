using System;
using System.Collections.Generic;

namespace mdf.Controllers
{
    public class CreateLinhaProducaoDTO
    {
        public List<Guid> lp { get; set; }
        public string descricao { get; set; }
    }
}