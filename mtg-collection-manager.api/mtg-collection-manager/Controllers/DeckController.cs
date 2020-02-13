using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mtg_collection_manager.Commands.Deck;
using mtg_collection_manager.Models;
using mtg_collection_manager.Repos;

namespace mtg_collection_manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeckController : FirebaseEnabledController
    {
        private readonly DeckRepo _deckRepo = new DeckRepo();
        private readonly UserRepo _userRepo = new UserRepo();

        [HttpGet("userdecks")]
        [Authorize]
        public IEnumerable<Deck> GetUserDecks()
        {
            var user = _userRepo.GetUserByFirebaseUid(FirebaseUid);
            if (user == null)
            {
                return new List<Deck>();
            }
            var userDecks = _deckRepo.GetUserDecks(user.Id);
            return userDecks;
        }

        [HttpGet("{deckId}")]
        [Authorize]
        public ActionResult<Deck> GetDeckById(string deckId)
        {
            var matchedDeck = _deckRepo.GetDeckByDeckId(deckId);
            return matchedDeck;
        }

        [HttpPost]
        [Authorize]
        public IActionResult CreateUserDeck(AddNewDeckCommand userDeck)
        {
            var user = _userRepo.GetUserByFirebaseUid(FirebaseUid);
            var newDeck = new Deck
            {
                UserId = user.Id,
                Name = userDeck.Name,
                Type = userDeck.Type,
                Description = userDeck.Description,
                Rating = 1
            };

            var addedDeck = _deckRepo.AddNewDeck(newDeck);
            return Created($"api/Deck/{addedDeck.Id}", addedDeck);
        }

        [HttpDelete("delete/{deckId}")]
        [Authorize]
        public IActionResult DeleteDeck(Guid deckId)
        {
/*            var _sleeveRepo = new SleeveRepo();
            var _userCardRepo = new UserCardRepo();

            var deckSleeves = _sleeveRepo.GetDeckSleevesByDeckId(deckId);
            if (deckSleeves != null)
            {
                foreach (var deckSleeve in deckSleeves)
                {
                    _userCardRepo.DeleteCardById(deckSleeve.CardId);
                }
            }*/
            _deckRepo.DeleteDeck(deckId);
            return Ok();
        }
    }
}