using mdf.DTO;
using mdf.Model;
using mdf.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mdf.Services
{
    public class MaquinaService
    {
        private readonly MDFcontext _ctx;

        public MaquinaService(MDFcontext ctx)
        {
            _ctx = ctx;
        }

        public async Task<Maquina> Maquina(Guid id)
        {
            if (_ctx.Maquinas.Find(id) == null) return null;

            return await _ctx.Maquinas
                .Include(m => m.TipoMaquina)
                .FirstAsync(tp => tp.Id == id);
        }

        public async Task<List<Maquina>> GetMaquinas()
        {
            return await _ctx.Maquinas
                .Include(maquina => maquina.TipoMaquina)
                .ToListAsync();
        }

        public async Task<List<Maquina>> GetMaquinasTipoMaquina(Guid id)
        {
            return await _ctx.Maquinas
                .Where(m => m.TipoMaquina.Id == id)
                .ToListAsync();
        }

        public async Task<Maquina> AddMaquina(MaquinaDTO item, TipoMaquina tipoMaquina)
        {
            var maq = new Maquina(item.descricao, item.localizacao, tipoMaquina);

            await _ctx.Maquinas.AddAsync(maq);

            await _ctx.SaveChangesAsync();

            return maq;
        }

        public async Task<Maquina> AlterarTipoMaquina(Maquina maquina, TipoMaquina tipoMaquina)
        {
            maquina.TipoMaquina = tipoMaquina;
            _ctx.Maquinas.Update(maquina);

            await _ctx.SaveChangesAsync();

            return maquina;
        }

        public async Task<Maquina> DeleteMaquina(Guid id)
        {
            var mq = _ctx.Maquinas
                .FirstOrDefault(m => m.Id.Equals(id));

            if (mq == null) return null;

            _ctx.Maquinas.Remove(mq);
            await _ctx.SaveChangesAsync();

            return mq;
        }
    }
}