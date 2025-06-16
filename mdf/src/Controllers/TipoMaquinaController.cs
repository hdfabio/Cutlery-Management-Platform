using mdf.DTO;
using mdf.Repository;
using mdf.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace mdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TipoMaquinaController : ControllerBase
    {
        private readonly OperacaoService _operacaoService;
        private readonly TipoMaquinaService _tipoMaquinaService;

        public TipoMaquinaController(MDFcontext ctx)
        {
            _operacaoService = new OperacaoService(ctx);
            _tipoMaquinaService = new TipoMaquinaService(ctx);
        }

        // GET: TiposMaquina
        [HttpGet]
        public async Task<IActionResult> GetTiposMaquina()
        {
            try
            {
                var tipoMaquinas = await _tipoMaquinaService.GetTiposMaquina();

                if (tipoMaquinas.Count == 0) return NoContent();

                return Ok(tipoMaquinas.ToList());
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        // GET: TiposMaquina/x
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTipoMaquina([FromRoute] Guid id)
        {
            try
            {
                var res = await _tipoMaquinaService.GetTipoMaquina(id);

                if (res == null) return NotFound(id);

                return Ok(res);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        // GET: TiposMaquina/x
        [HttpGet("tipoMaquina={id}&operacoes")]
        public async Task<IActionResult> GetOperacoesTipoMaquina([FromRoute] Guid id)
        {
            try
            {
                var tipoMaquina = await _tipoMaquinaService.GetTipoMaquina(id);

                if (tipoMaquina == null) return NotFound(id);

                var ops = _tipoMaquinaService.GetOpsTipoMaquina(id);

                return Ok(ops);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpPost("{new}")]
        public async Task<IActionResult> CreateTipoMaquina(AddTipoMaquinaDTO tipo)
        {
            try
            {
                if (tipo.ops.Count == 0)
                    return BadRequest("Para criar um tipo de maquina deve existir pelo menos uma operação!");

                var listOp = await _operacaoService.GetOperacoes(tipo.ops);

                var res = await _tipoMaquinaService.AddTipoMaquina(tipo.descricao, listOp);

                return Created("Tipo de Maquina criado com sucesso!", res);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoMaquina(Guid id)
        {
            try
            {
                var mq = await _tipoMaquinaService.DeleteTipoMaquina(id);

                if (mq == null) return NotFound(id);
                return Ok(mq);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpPut]
        public async Task<IActionResult> AddOperacao(AddOperacaoDTO add)
        {
            try
            {
                var operacao = await _operacaoService.GetOperacao(add.op);
                var tipo = await _tipoMaquinaService.GetTipoMaquina(add.tp);

                if (tipo == null) return NotFound(add.tp);
                if (operacao == null) return NotFound(add.op);

                if (tipo.TipoMaquinaOperacoes.Where(tmo => tmo.Operacao == operacao).Select(tmo => tmo.Operacao)
                        .ToList()
                        .Count != 0)
                    return BadRequest("Tipo de maquina já efetua operacao introduzida!");

                tipo = await _tipoMaquinaService.AddOperacao(tipo, operacao);
                return Ok(tipo);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditOperacao(Guid id, List<Guid> list)
        {
            try
            {
                if (list.Count == 0) return NoContent();

                if (await _tipoMaquinaService.GetTipoMaquina(id) == null)
                    return NotFound("Tipo de Maquina nao encontrado! ID: " + id);

                var ops = await _operacaoService.GetOperacoes(list);

                if (ops.Count == 0) return NoContent();

                var tipo = await _tipoMaquinaService.UpdateOperacoes(id, ops);
                if (tipo != null) return Ok(tipo);

                return NotFound();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }
    }
}