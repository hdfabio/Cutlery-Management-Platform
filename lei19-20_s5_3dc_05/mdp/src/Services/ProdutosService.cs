using mdp.Model;
using mdp.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace mdp.Services
{
    public class ProdutosService
    {
        private readonly MDPContext _ctx;

        public ProdutosService(MDPContext context)
        {
            _ctx = context;
        }

        public async Task<List<Produto>> GetProdutos()
        {
            return await _ctx.Produtos
                .Include(p => p.PlanoFabrico)
                .ToListAsync();
        }

        public async Task<Produto> GetProduto(Guid id)
        {
            return await _ctx.Produtos
                .Include(p => p.PlanoFabrico)
                .FirstAsync(p => p.Id == id);
        }

        public async Task<Produto> DeleteProduto(Guid id)
        {
            var prod = await _ctx.Produtos
                .Include(p => p.PlanoFabrico)
                .FirstAsync(p => p.Id == id);

            if (prod == null) return null;

            var res = _ctx.Produtos.Remove(prod).Entity;
            await _ctx.SaveChangesAsync();

            return res;
        }

        public async Task<Produto> UpdatePlanoFabrico(Produto produto, PlanoFabrico plano)
        {
            if (produto == null || plano == null) return null;

            produto.PlanoFabrico = plano;
            _ctx.Produtos.Update(produto);

            await _ctx.SaveChangesAsync();

            return produto;
        }
    }
}