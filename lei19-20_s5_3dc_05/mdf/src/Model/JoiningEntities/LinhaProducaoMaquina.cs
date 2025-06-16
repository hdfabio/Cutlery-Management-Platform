using System;

namespace mdf.Model.JoiningEntities
{
    public class LinhaProducaoMaquina
    {
        public Guid LinhaProducaoId { get; set; }
        public LinhaProducao LinhaProducao { get; set; }

        public Guid MaquinaId { get; set; }
        public Maquina Maquina { get; set; }
    }
}