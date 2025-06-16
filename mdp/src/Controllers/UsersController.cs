using System.Threading.Tasks;
using mdp.DTO;
using mdp.Model;
using mdp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace mdp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userParam)
        {
            var login = new LoginDTO {email = userParam.email, password = userParam.password};

            var user1 = await _userService.ValidateUser(login);
            var user = _userService.Authenticate(user1);

            if (user1 == null)
                return BadRequest(new {message = "Username or password is incorrect or not allowed"});


            return Ok(user);
        }
    }
}