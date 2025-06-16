using mdp.DTO;
using mdp.Model;
using mdp.Repository;
using mdp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;


namespace mdp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProdutosController : Controller
    {
        private readonly MDPContext _ctx;
        private readonly PlanoFabricoService _planoFabricoService;
        private readonly ProdutosService _produtosService;

        public ProdutosController(MDPContext context)
        {
            _ctx = context;
            _planoFabricoService = new PlanoFabricoService(context);
            _produtosService = new ProdutosService(context);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetProdutos()
        {
            try
            {
                var res = await _produtosService.GetProdutos();

                if (res == null || res.Count == 0) return NoContent();

                return Ok(res);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduto(Guid id)
        {
            try
            {
                var produto = await _produtosService.DeleteProduto(id);

                if (produto == null) return NotFound();

                return Ok(produto);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Produto>> GetProduto(Guid id)
        {
            try
            {
                var res = await _produtosService.GetProduto(id);

                if (res == null) return NotFound("Produto não encontrado! ID: " + id);

                return Ok(res);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpPut("id={i}&plano={pl}")]
        public async Task<IActionResult> MudarPlanoFabrico(Guid i, Guid pl)
        {
            try
            {
                var produto = await _produtosService.GetProduto(i);

                var plano = await _planoFabricoService.GetPlanoFabrico(pl);

                produto = await _produtosService.UpdatePlanoFabrico(produto, plano);

                if (produto == null) BadRequest();

                return Ok(produto);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpGet("id={id}")]
        public async Task<IActionResult> GetPlanoDeFabrico([FromRoute] Guid id)
        {
            try
            {
                var produto = await _produtosService.GetProduto(id);

                if (produto == null) return NotFound("Produto não encontrado! ID: " + id);

                return Ok(produto.PlanoFabrico);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> NewProduto(ProdutoDTO p)
        {
            try
            {
                var plano = await _planoFabricoService.GetPlanoFabrico(p.IdPlano);
                if (plano == null) return NotFound("Plano de Frabrico não encontrado! ID:" + p.IdPlano);

                var newProd = new Produto(p.Descricao, plano);

                await _ctx.Produtos.AddAsync(newProd);
                await _ctx.SaveChangesAsync();

                return Created("Produto creado com sucess!", newProd);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }
    }
}