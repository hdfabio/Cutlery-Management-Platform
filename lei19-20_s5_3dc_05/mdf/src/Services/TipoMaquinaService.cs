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
    public class TipoMaquinaService
    {
        private readonly MDFcontext _ctx;

        public TipoMaquinaService(MDFcontext ctx)
        {
            _ctx = ctx;
        }

        public async Task<TipoMaquina> GetTipoMaquina(Guid id)
        {
            if (_ctx.TiposMaquinas.Find(id) == null) return null;

            return await _ctx.TiposMaquinas
                .FirstAsync(op => op.Id == id);
        }

        public async Task<List<TipoMaquina>> GetTiposMaquina()
        {
            return await _ctx.TiposMaquinas.Include(tp => tp.TipoMaquinaOperacoes)
                .ToListAsync();
        }

        public async Task<TipoMaquina> AddTipoMaquina(string tipoDescricao, List<Operacao> listOp)
        {
            var tp = new TipoMaquina(tipoDescricao);

            foreach (var op in listOp)
            {
                var tmo = new TipoMaquinaOperacao {Operacao = op, TipoMaquina = tp};

                tp.TipoMaquinaOperacoes.Add(tmo);
                op.TipoMaquinaOperacoes.Add(tmo);
                _ctx.TipoMaquinaOperacoes.Add(tmo);
            }

            await _ctx.TiposMaquinas.AddAsync(tp);
            await _ctx.SaveChangesAsync();

            return tp;
        }

        public async Task<TipoMaquina> DeleteTipoMaquina(Guid id)
        {
            var mq = _ctx.TiposMaquinas
                .FirstOrDefault(tp => tp.Id.Equals(id));

            if (mq == null) return null;

            _ctx.TiposMaquinas.Remove(mq);
            await _ctx.SaveChangesAsync();

            return mq;
        }

        public async Task<TipoMaquina> AddOperacao(TipoMaquina tipo, Operacao operacao)
        {
            var tmo = new TipoMaquinaOperacao {Operacao = operacao, TipoMaquina = tipo};

            var opsTipoMaquina = GetOpsTipoMaquina(tipo.Id);
            if (opsTipoMaquina.Count != 0) return tipo;

            tipo.TipoMaquinaOperacoes.Add(tmo);
            _ctx.TiposMaquinas.Update(tipo);
            _ctx.TipoMaquinaOperacoes.Add(tmo);
            await _ctx.SaveChangesAsync();

            return tipo;
        }

        public async Task<TipoMaquina> UpdateOperacoes(Guid tipoId, List<Operacao> ops)
        {
            var tipo = _ctx.TiposMaquinas
                .Include(tmo => tmo.TipoMaquinaOperacoes).First(tmo => tmo.Id == tipoId);

            if (tipo == null) return null;

            tipo.TipoMaquinaOperacoes = new List<TipoMaquinaOperacao>();
            _ctx.TiposMaquinas.Update(tipo);
            _ctx.SaveChanges();

            foreach (var op in ops)
            {
                var tmo = new TipoMaquinaOperacao {Operacao = op, TipoMaquina = tipo};

                var opsTipoMaquina = GetOpsTipoMaquina(tipo.Id);
                if (opsTipoMaquina.Count != 0) return tipo;

                tipo.TipoMaquinaOperacoes.Add(tmo);
                _ctx.TiposMaquinas.Update(tipo);
                _ctx.TipoMaquinaOperacoes.Add(tmo);
            }

            await _ctx.SaveChangesAsync();

            return _ctx.TiposMaquinas
                .Include(tmo => tmo.TipoMaquinaOperacoes).First(tmo => tmo.Id == tipoId);
        }

        public List<Operacao> GetOpsTipoMaquina(Guid id)
        {
            var tmos = _ctx.TipoMaquinaOperacoes
                .Include(tmo => tmo.Operacao)
                .Where(tmo => tmo.TipoMaquinaId == id).ToList();

            return tmos.Select(tmo => tmo.Operacao).ToList();
        }
    }
}