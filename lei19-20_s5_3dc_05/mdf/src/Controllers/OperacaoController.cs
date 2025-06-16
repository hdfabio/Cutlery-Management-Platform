using mdf.DTO;
using mdf.Model;
using mdf.Repository;
using mdf.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace mdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OperacaoController : Controller
    {
        private readonly OperacaoService _operacaoService;

        public OperacaoController(MDFcontext ctx)
        {
            _operacaoService = new OperacaoService(ctx);
        }

        // GET: Operacooes
        [HttpGet]
        public async Task<IActionResult> GetOperacoes()
        {
            try
            {
                var listAsync = await _operacaoService.GetOperacoes();

                if (listAsync.Count == 0) return NoContent();

                return Ok(listAsync);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        // GET: Operacoes/x
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOperacao(Guid id)
        {
            try
            {
                var res = await _operacaoService.GetOperacao(id);

                if (res == null) return NotFound();

                return Ok(res);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddOperacao(OperacaoDTO op)
        {
            try
            {
                var opr = await _operacaoService.AddOperacao(op);

                if (opr == null) return NoContent();

                return Created("Operacao Adicionada com sucesso!", opr);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpPut("id={id}")]
        public async Task<IActionResult> AlterarOperacao([FromRoute] Guid id, OperacaoDTO op)
        {
            try
            {
                if (op != null && string.IsNullOrEmpty(op.descricao) && op.duracao == 0)
                    return NoContent();

                var operacao = await _operacaoService.UpdateOperacao(id, op);

                return Ok(operacao);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOperacao(Guid id)
        {
            try
            {
                var op = await _operacaoService.GetOperacao(id);

                if (op == null) return NotFound(id);

                op = await _operacaoService.DeleteOperacao(op);

                return Ok(op);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }
    }
}