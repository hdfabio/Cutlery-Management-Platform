using mdf.DTO;
using mdf.Repository;
using mdf.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace mdf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MaquinaController : Controller
    {
        private readonly MaquinaService _maquinaService;
        private readonly TipoMaquinaService _tipoMaquinaService;

        public MaquinaController(MDFcontext ctx)
        {
            _tipoMaquinaService = new TipoMaquinaService(ctx);
            _maquinaService = new MaquinaService(ctx);
        }

        // GET: Maquina
        [HttpGet]
        public async Task<IActionResult> GetMaquinas()
        {
            try
            {
                var listAsync = await _maquinaService.GetMaquinas();

                if (listAsync.Count == 0) return NoContent();

                return Ok(listAsync);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        // GET: Maquina/id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMaquina(Guid id)
        {
            try
            {
                var maq = await _maquinaService.Maquina(id);

                if (maq != null) return Ok(maq);

                return NotFound();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest();
            }
        }

        // GET: Maquina/tipoMaquina={id}
        [HttpGet("tipoMaquina={id}")]
        public async Task<IActionResult> GetMaquinasTipoMaquina(Guid id)
        {
            try
            {
                var maqs = await _maquinaService.GetMaquinasTipoMaquina(id);

                if (maqs != null) return Ok(maqs);

                return NotFound();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest();
            }
        }


        [HttpPost("{new}")]
        public async Task<IActionResult> NovaMaquina(MaquinaDTO item)
        {
            try
            {
                var tipoMaquina = await _tipoMaquinaService.GetTipoMaquina(item.tipoMaquina);

                if (tipoMaquina == null) return NotFound("O tipo de máquina especificado não existe");

                var maq = await _maquinaService.AddMaquina(item, tipoMaquina);

                return Created("Criou maquina com sucesso!", maq);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpPut("id={id}&tipomaquina={tip}")]
        public async Task<IActionResult> AlterarTipoMaquina([FromRoute] Guid id, [FromRoute] Guid tip)
        {
            try
            {
                var maquina = await _maquinaService.Maquina(id);
                var tipoMaquina = await _tipoMaquinaService.GetTipoMaquina(tip);

                if (maquina == null) return NotFound(id);
                if (tipoMaquina == null) return NotFound(tip);

                await _maquinaService.AlterarTipoMaquina(maquina, tipoMaquina);

                return Ok(maquina);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaquina(Guid id)
        {
            try
            {
                var mq = await _maquinaService.DeleteMaquina(id);

                if (mq == null) return NotFound(id);

                return Ok(mq);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }
    }
}