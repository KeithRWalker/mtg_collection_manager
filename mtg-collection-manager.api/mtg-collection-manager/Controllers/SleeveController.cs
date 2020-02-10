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
    public class SleeveController : FirebaseEnabledController
    {
        private readonly SleeveRepo _sleeveRepo = new SleeveRepo();
        private readonly UserCardRepo _userCardRepo = new UserCardRepo();
        private readonly CompleteCardRepo _completeCardRepo = new CompleteCardRepo();

        [HttpGet("binder/{binderId}")]
        [Authorize]
        public IEnumerable<CompleteCard> GetAllCardsForBinder(string binderId)
        {
            var binderSleeves = _sleeveRepo.GetAllBinderSleevesByBinderId(binderId);
            var completeCards = new List<CompleteCard>();
            foreach (var sleeve in binderSleeves)
            {
                var userCard = _userCardRepo.GetUserCardByUserCardId(sleeve.CardId);

                var completedCard = _completeCardRepo.CreateCompleteCardFromUserCard(userCard);

                completeCards.Add(completedCard);
            }
            return completeCards;
        }

        [HttpGet("deck/{deckId}")]
        [Authorize]
        public IEnumerable<CompleteCard> GetAllCardsForDeck(string deckId)
        {
            var deckSleeves = _sleeveRepo.GetAllDeckSleevesByDeckId(deckId);
            var completeCards = new List<CompleteCard>();

            foreach (var sleeve in deckSleeves)
            {
                var userCard = _userCardRepo.GetUserCardByUserCardId(sleeve.CardId);
                var completedCard = _completeCardRepo.CreateCompleteCardFromUserCard(userCard);

                completeCards.Add(completedCard);
            }

            return completeCards;
        }
    }
}