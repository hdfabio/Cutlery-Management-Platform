using mdp.DTO;
using mdp.Model;
using mdp.Repository;
using mdp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace mdp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PlanoFabricoController : Controller
    {
        private readonly OperacoesServico _operacoesServico;
        private readonly PlanoFabricoService _planoFabricoService;


        public PlanoFabricoController(MDPContext context)
        {
            _operacoesServico = new OperacoesServico(context);
            _planoFabricoService = new PlanoFabricoService(context);
        }

        [HttpPost]
        public async Task<IActionResult> NovoPlanoFabrico(PlanoFabricoDTO item)
        {
            try
            {
                var opList = new List<Operacao>();

                Operacao operacao;
                foreach (var operacaoId in item.operacoes)
                {
                    operacao = await _operacoesServico.GetOperacao(operacaoId);

                    if (operacao == null)
                    {
                        var op = await _operacoesServico.GetOperacaoMDF(operacaoId);

                        opList.Add(op);
                    }
                    else
                    {
                        opList.Add(operacao);
                    }
                }

                var res = await _planoFabricoService.SavePlanoFabrico(item, opList);

                return Created("Plano de Fabrico criado com sucesso!", res);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpDelete("id={id}")]
        public async Task<IActionResult> DeletePlanosFabrico(Guid id)
        {
            try
            {
                var planoFabrico = await _planoFabricoService.DeletePlanoFabrico(id);

                if (planoFabrico != null) return Ok(planoFabrico);

                return NotFound(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpDelete("pf={id}&ope={op}")]
        public async Task<IActionResult> DeleteOperacao(Guid id, Guid op)
        {
            try
            {
                var operacao = await _operacoesServico.GetOperacao(op);
                var planoFabrico = await _planoFabricoService.GetPlanoFabrico(id);

                if (planoFabrico == null || operacao == null) return NotFound();

                var res = await _planoFabricoService.RemoveOperacao(planoFabrico, operacao);

                return Ok(res);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpPut("id={i}&op={ope}")]
        public async Task<IActionResult> PostOperacao(Guid i, Guid ope)
        {
            try
            {
                var op = await _operacoesServico.GetOperacaoMDF(ope);
                if (op == null) return NotFound("Operacao não encontrada: " + ope);

                var planofabrico = await _planoFabricoService.GetPlanoFabrico(i);
                if (planofabrico == null) return NotFound("Plano de Fagrico não encontrado! ID: " + i);

                var opr = await _operacoesServico.GetOperacao(op.Id) ?? await _operacoesServico.NewOperacao(op.Id,
                              op.Descricao.Value, op.Execucao.Value,
                              op.Ferramenta);

                var res = await _planoFabricoService.AddOperacao(planofabrico, opr);

                return Created("Plano de Fabrico criado com sucesso!", res);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetPlanosFabrico()
        {
            try
            {
                var res = await _planoFabricoService.GetPlanosFabrico();

                if (res.Count == 0) return NoContent();

                return Ok(res);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlanoFabrico(Guid id)
        {
            try
            {
                var res = await _planoFabricoService.GetPlanoFabrico(id);

                if (res == null) return NotFound(id);

                return Ok(res);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e);
            }
        }
    }
}