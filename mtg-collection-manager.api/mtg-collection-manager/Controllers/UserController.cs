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

        [HttpGet("all")]
        public IEnumerable<User> GetAllUsers()
        {
            return _userRepo.GetAllUsers();
        }

        // POST: api/User
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

            var _userRepo = new UserRepo();
            var userCreated = _userRepo.CreateNewUser(userToAdd);
            
            if (userCreated == null)
            {
                return NotFound("could not create user");
            }
            return Ok(userCreated);
        }
    }
}
