using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mtg_collection_manager.Commands.Binder;
using mtg_collection_manager.Models;
using mtg_collection_manager.Repos;

namespace mtg_collection_manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BinderController : FirebaseEnabledController
    {
        private readonly BinderRepo _binderRepo = new BinderRepo();
        private readonly UserRepo _userRepo = new UserRepo();

        [HttpGet("userbinders")]
        [Authorize]
        public IEnumerable<Binder> GetUserBinders()
        {
            var user = _userRepo.GetUserByFirebaseUid(FirebaseUserId);
            var binders = _binderRepo.GetUserBinders(user.Id);

            return binders;
        }

        [HttpGet("{binderId}")]
        [Authorize]
        public ActionResult<Binder> GetBinderById(string binderId)
        {
            var matchedBinder = _binderRepo.GetBinderByBinderId(binderId);
            return matchedBinder;
        }

        [HttpPost]
        [Authorize]
        public IActionResult CreateUserBinder(AddNewBinderCommand userBinder)
        {
            var user = _userRepo.GetUserByFirebaseUid(FirebaseUserId);
            var newBinder = new Binder
            {
                UserId = user.Id,
                Name = userBinder.Name,
                Type = userBinder.Type,
                Description = userBinder.Description,
                TotalValue = 0
            };

            var addedBinder = _binderRepo.AddNewBinder(newBinder);
            return Created($"api/binder/{addedBinder.Id}", addedBinder);
        }
    }
}