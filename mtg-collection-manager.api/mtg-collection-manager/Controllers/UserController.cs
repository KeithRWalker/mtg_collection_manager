using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mtg_collection_manager.Commands;
using mtg_collection_manager.Models;
using mtg_collection_manager.Repos;

namespace mtg_collection_manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : FirebaseEnabledController
    {

        private readonly UserRepo _userRepo = new UserRepo();
        private readonly BinderRepo _binderRepo = new BinderRepo();
        private  readonly DeckRepo _deckRepo = new DeckRepo();

        [HttpGet("all")]
        public IEnumerable<User> GetAllUsers()
        {
            return _userRepo.GetAllUsers();
        }

        [HttpPost]
        [Authorize]
        public IActionResult CreateUser(AddUserCommand newUserCommand)
        {
            var userToAdd = new User
            {
                Email = newUserCommand.Email,
                FirstName = newUserCommand.FirstName,
                LastName = newUserCommand.LastName,
                UserName = newUserCommand.UserName,
                FirebaseUid = FirebaseUserId
            };
            var userCreated = _userRepo.CreateNewUser(userToAdd);
            if (userCreated == null)
            {
                return NotFound("could not create user");
            }
            _deckRepo.CreateHiddenDeck(userCreated.Id);
            _binderRepo.CreateHiddenBinder(userCreated.Id);
            return Ok(userCreated);
        }
    }
}
