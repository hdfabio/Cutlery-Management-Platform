using System;
using System.Collections.Generic;

namespace mdp.DTO
{
    public class PlanoFabricoDTO
    {
        public string descricao { get; set; }
        public List<Guid> operacoes { get; set; }
    }
}