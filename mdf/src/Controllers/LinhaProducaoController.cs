using mdf.DTO;
using mdf.Model;
using mdf.Repository;
using mdf.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace mdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LinhaProducaoController : ControllerBase
    {
        private readonly LinhaProducaoService _linhaProducaoService;
        private readonly MaquinaService _maquinaService;

        public LinhaProducaoController(MDFcontext ctx)
        {
            _maquinaService = new MaquinaService(ctx);
            _linhaProducaoService = new LinhaProducaoService(ctx);
        }

        // GET: LinhasProdrucao
        [HttpGet]
        public async Task<IActionResult> GetLinhasProducao()
        {
            var res = await _linhaProducaoService.GetLinhasProducao();

            if (res.Count != 0) return Ok(res);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLinhaProducao(Guid id)
        {
            try
            {
                var mq = await _linhaProducaoService.DeleteLinhaProducao(id);

                if (mq == null) return NotFound(id);

                return Ok(mq);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        // GET: LinhaProducao/x
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLinhaProducao([FromRoute] Guid id)
        {
            var res = await _linhaProducaoService.GetLinhaProducao(id);
            Console.WriteLine(res);
            if (res == null) return NotFound();

            return Ok(res);
        }

        //POST: LinhaProducao
        [HttpPost("{new}")]
        public async Task<IActionResult> CreateLinhaProducao(CreateLinhaProducaoDTO lp)
        {
            try
            {
                if (lp.lp.Count == 0)
                    return BadRequest();

                var listMaquinas = new LinkedList<Maquina>();

                foreach (var mq in lp.lp)
                {
                    var maquina = await _maquinaService.Maquina(mq);
                    listMaquinas.AddFirst(maquina);
                }

                var res = await _linhaProducaoService.SaveLinhaProducao(lp.descricao, listMaquinas);

                return Created("Criou Linha de Producacao com sucesso!", res);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }


        [HttpPut]
        public async Task<IActionResult> AddMaquina(AddMaquinaDTO add)
        {
            try
            {
                var maquina = await _maquinaService.Maquina(add.mq);
                var linha = await _linhaProducaoService.GetLinhaProducao(add.lp);

                if (maquina == null) return NotFound(add.mq);
                if (linha == null) return NotFound(add.lp);

                linha = await _linhaProducaoService.AddMaquina(linha, maquina);

                return Ok(linha);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }
    }
}