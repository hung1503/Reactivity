
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Username = username})); 
        }
        
        [HttpPut]
        public async Task<IActionResult> EditProfile(string username, Profile profile)
        {
            profile.Username = username;
            return HandleResult(await Mediator.Send(new Edit.Command{DisplayName = profile.DisplayName, Bio = profile.Bio}));
        }

        [HttpGet("{username}/activities")]
        public async Task<IActionResult> GetEventActivities(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListActivities.Query{Username = username, Predicate = predicate}));
        }
    }
}