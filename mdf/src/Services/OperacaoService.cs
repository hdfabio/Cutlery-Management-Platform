using mdf.DTO;
using mdf.Model;
using mdf.Model.JoiningEntities;
using mdf.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery.Internal;

namespace mdf.Services
{
    public class OperacaoService
    {
        private readonly MDFcontext _ctx;

        public OperacaoService(MDFcontext ctx)
        {
            _ctx = ctx;
        }

        public async Task<List<Operacao>> GetOperacoes(List<Guid> ids)
        {
            var ops = new List<Operacao>();

            foreach (var id in ids)
            {
                var operacao = await _ctx.Operacoes.Include(op => op.Ferramenta).FirstAsync(op => op.Id == id);
                if (operacao != null) ops.Add(operacao);
            }

            return ops;
        }

        public async Task<List<Operacao>> GetOperacoes()
        {
            return await _ctx.Operacoes.Include(op => op.Ferramenta).ToListAsync();
        }

        public async Task<Operacao> GetOperacao(Guid id)
        {
            return await _ctx.Operacoes.FindAsync(id);
        }

        public async Task<Operacao> AddOperacao(OperacaoDTO op)
        {
            if (string.IsNullOrEmpty(op.descricao) || string.IsNullOrEmpty(op.ferramenta) || op.duracao <= 0 ||
                op.setup <= 0) return null;

            var ferramenta = new Ferramenta(op.setup, op.ferramenta);

            var operacao = new Operacao(op.descricao, op.duracao, ferramenta);

            await _ctx.Operacoes.AddAsync(operacao);
            await _ctx.Ferramentas.AddAsync(ferramenta);

            await _ctx.SaveChangesAsync();

            return operacao;
        }

        public async Task<Operacao> UpdateOperacao(Guid id, OperacaoDTO op)
        {
            var operacao = await GetOperacao(id);
            if (operacao == null) return null;
            if (op == null) return null;

            var fer = operacao.Ferramenta;

            if (!string.IsNullOrEmpty(op.descricao))
            {
                operacao.Descricao.Value = op.descricao;
            }

            if (op.duracao != 0)
            {
                operacao.Execucao.Value = op.duracao;
            }

            if (!string.IsNullOrEmpty(op.ferramenta))
            {
                _ctx.Ferramentas.Remove(fer);
                fer = new Ferramenta(op.setup, op.ferramenta);

                operacao.Ferramenta = fer;
                _ctx.Ferramentas.Add(fer);
            }

            await _ctx.SaveChangesAsync();

            return operacao;
        }

        public async Task<Operacao> DeleteOperacao(Operacao op)
        {
            _ctx.Operacoes.Remove(op);
            await _ctx.SaveChangesAsync();

            return op;
        }
    }
}