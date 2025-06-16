using mdp.Model;
using mdp.Repository;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using mdp.DTO;

namespace mdp.Services
{
    public class OperacoesServico
    {
        private static readonly HttpClient Client = new HttpClient();
        private readonly MDPContext _ctx;


        public OperacoesServico(MDPContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<Operacao> GetOperacaoMDF(Guid id)
        {
            var user = await AuthMDF();
            var token = user.token;

            Client.DefaultRequestHeaders.Authorization
                = new AuthenticationHeaderValue("Bearer", token);

            //TODO Adicionar String do Servidor
            var operacoes =
                await Client.GetStringAsync("https://localhost:5001/api/operacao/" + id);


            return operacoes == null ? null : JsonConvert.DeserializeObject<Operacao>(operacoes);
        }

        public async Task<Operacao> NewOperacao(Guid id, string descricao, long duracao, Ferramenta ferramenta)
        {
            var operacao = new Operacao(descricao, duracao, ferramenta);
            operacao.Id = id;


            await _ctx.Operacoes.AddAsync(operacao);

            return operacao;
        }

        public async Task<Operacao> GetOperacao(Guid id)
        {
            return await _ctx.Operacoes.FindAsync(id);
        }

        public async Task<User1> AuthMDF()
        {
            var login = new LoginDTO {email = "admin@vitorbrito.com", password = "961461731"};

            var auth = Client.PostAsJsonAsync("https://localhost:5001/api/users/authenticate", login);

            var result = auth;

            var finalRes = await result.Result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<User1>(finalRes);
        }
    }
}