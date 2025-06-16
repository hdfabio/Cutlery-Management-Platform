using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using mdp.DTO;
using mdp.Helpers;
using mdp.Model;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace mdp.Services
{
    public interface IUserService
    {
        User1 Authenticate(User1 user);
        Task<User1> ValidateUser(LoginDTO userParamEmail);
    }

    public class UserService : IUserService
    {
        private static readonly HttpClient Client = new HttpClient();

        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public User1 Authenticate(User1 user)
        {
            // return null if user not found
            if (user == null)
                return null;

            if (user.user.type != "Admin") return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.user._id)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.user.password = null;

            return user;
        }

        public async Task<User1> ValidateUser(LoginDTO login)
        {
            var postTask = Client.PostAsJsonAsync("http://localhost:5002/api/auth", login);

            var result = postTask.Result;
            if (!result.IsSuccessStatusCode) return null;

            var user = await result.Content.ReadAsAsync<User1>();

            return user;
        }
    }
}