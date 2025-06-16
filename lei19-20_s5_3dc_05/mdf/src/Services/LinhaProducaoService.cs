using mdf.Model;
using mdf.Model.JoiningEntities;
using mdf.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mdf.Services
{
    public class LinhaProducaoService
    {
        private readonly MDFcontext _ctx;

        public LinhaProducaoService(MDFcontext context)
        {
            _ctx = context;
        }

        public async Task<LinhaProducao> SaveLinhaProducao(string lpDescricao, IEnumerable<Maquina> maquinas)
        {
            var linha = new LinhaProducao(lpDescricao);

            foreach (var lpm in maquinas.Select(maq => new LinhaProducaoMaquina
            {
                LinhaProducao = linha,
                Maquina = maq
            }))
                linha.LinhaProducaoMaquinas.Add(lpm);

            await _ctx.LinhasProducao.AddAsync(linha);
            await _ctx.SaveChangesAsync();

            return linha;
        }

        public async Task<List<LinhaProducao>> GetLinhasProducao()
        {
            return await _ctx.LinhasProducao
                .Include(p => p.LinhaProducaoMaquinas)
                .ThenInclude(lpm => lpm.LinhaProducao)
                .Include(p => p.LinhaProducaoMaquinas)
                .ThenInclude(lpm => lpm.Maquina)
                .ToListAsync();
        }

        public async Task<LinhaProducao> DeleteLinhaProducao(Guid id)
        {
            var lp = await _ctx.LinhasProducao.FirstOrDefaultAsync(tp => tp.Id.Equals(id));

            if (lp == null) return null;

            _ctx.LinhasProducao.Remove(lp);
            await _ctx.SaveChangesAsync();

            return lp;
        }

        public async Task<LinhaProducao> GetLinhaProducao(Guid id)
        {
            if (await _ctx.LinhasProducao.FindAsync(id) == null) return null;

            var lp = await _ctx.LinhasProducao
                .Include(p => p.LinhaProducaoMaquinas)
                .ThenInclude(maquina => maquina.Maquina)
                .FirstOrDefaultAsync(m => m.Id.Equals(id));

            return lp;
        }

        public async Task<LinhaProducao> AddMaquina(LinhaProducao linha, Maquina maquina)
        {
            if (_ctx.LinhasProducao.Find(linha.Id) == null) return null;

            var lpm = new LinhaProducaoMaquina
            {
                LinhaProducao = linha,
                Maquina = maquina
            };

            linha.LinhaProducaoMaquinas.Add(lpm);
            _ctx.LinhaProducaoMaquinas.Add(lpm);
            _ctx.LinhasProducao.Update(linha);

            await _ctx.SaveChangesAsync();

            return linha;
        }
    }
}