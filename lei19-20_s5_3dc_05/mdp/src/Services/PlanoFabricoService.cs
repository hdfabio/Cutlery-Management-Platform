using mdp.DTO;
using mdp.Model;
using mdp.Model.JoiningEntity;
using mdp.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace mdp.Services
{
    public class PlanoFabricoService
    {
        private readonly MDPContext _ctx;

        public PlanoFabricoService(MDPContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<PlanoFabrico> SavePlanoFabrico(PlanoFabricoDTO pldto, List<Operacao> opList)
        {
            var pl = new PlanoFabrico(pldto.descricao);

            foreach (var op in opList)
            {
                var pfo = new PlanoFabricoOperacoes {Operacao = op, PlanoFabrico = pl};

                pl.PlanoFabricoOperacoes.Add(pfo);
                op.PlanoFabricoOperacoes.Add(pfo);

                _ctx.PlanoFabricoOperacoes.Add(pfo);
            }

            _ctx.Add(pl);
            await _ctx.SaveChangesAsync();

            return pl;
        }

        public async Task<PlanoFabrico> DeletePlanoFabrico(Guid id)
        {
            var planoFabrico = await _ctx.PlanosFabrico.FindAsync(id);

            if (planoFabrico == null) return null;

            _ctx.PlanosFabrico.Remove(planoFabrico);
            await _ctx.SaveChangesAsync();

            return planoFabrico;
        }

        public async Task<PlanoFabrico> GetPlanoFabrico(Guid id)
        {
            if (await _ctx.PlanosFabrico.FindAsync(id) == null) return null;

            return await _ctx.PlanosFabrico.FirstAsync(p => p.Id == id);
        }

        public async Task<PlanoFabrico> RemoveOperacao(PlanoFabrico planoFabrico, Operacao operacao)
        {
            foreach (var pfo in planoFabrico.PlanoFabricoOperacoes)
            {
                if (pfo.Operacao != operacao) continue;
                planoFabrico.PlanoFabricoOperacoes.Remove(pfo);
                break;
            }

            _ctx.PlanosFabrico.Update(planoFabrico);

            await _ctx.SaveChangesAsync();

            return planoFabrico;
        }

        public async Task<List<PlanoFabrico>> GetPlanosFabrico()
        {
            return await _ctx.PlanosFabrico.Include(plo => plo.PlanoFabricoOperacoes).ThenInclude(op => op.Operacao)
                .ToListAsync();
        }

        public async Task<PlanoFabrico> AddOperacao(PlanoFabrico planofabrico, Operacao op)
        {
            var pfo = new PlanoFabricoOperacoes {Operacao = op, PlanoFabrico = planofabrico};

            planofabrico.PlanoFabricoOperacoes.Add(pfo);
            op.PlanoFabricoOperacoes.Add(pfo);

            _ctx.PlanoFabricoOperacoes.Add(pfo);

            await _ctx.SaveChangesAsync();

            return planofabrico;
        }
    }
}