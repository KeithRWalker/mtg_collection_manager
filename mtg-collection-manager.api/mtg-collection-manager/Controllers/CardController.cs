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
    public class CardController : FirebaseEnabledController
    {
        private readonly CardRepo _cardRepo = new CardRepo();
        private readonly UserCardRepo _userCardRepo = new UserCardRepo();

        // GET: api/Card
        [HttpGet("random")]
        public object Get()
        {
            return _cardRepo.GetRandomCard();
        }


        [HttpGet("browse/{pageNum:int}")]
        public object BrowsePage(int pageNum)
        {
            return _cardRepo.BrowsePage(pageNum);
        }

        [HttpGet("id/{cardId:Guid}")]
        public Card GetCardDetails(string cardId)
        {
            var matchingCard = _cardRepo.GetCardDetails(cardId);

            return matchingCard;
        }

        [HttpGet("scryfall/{scryId}")]
        [Authorize]
        public IEnumerable<ConvertCard> GetScryCardByScryId(Guid scryId)
        {
            var list = new List<ConvertCard>();
            var scryCard = _cardRepo.GetScryCardByScryId(scryId);
            list.Add(scryCard);
            return list;
        }

        [HttpPost("usercard")]
        [Authorize]
        public bool AttachCardToUser(AttachCardToUserCommand additionInfo)
        {
            var sleeveRepo = new SleeveRepo();

            var scryCard = _cardRepo.GetCardDetails(additionInfo.ScryId);
            var userCard = _userCardRepo.AttachCardToUser(scryCard);

            _userCardRepo.LinkCardLists(scryCard, userCard.Id);

            if (additionInfo.CollectionType == "Deck")
            {
                var deckRepo = new DeckRepo();
                var deckToAddTo = deckRepo.GetDeckByDeckId(additionInfo.CollectionId);
                var sleeveInfo = new
                {
                    DeckId = deckToAddTo.Id,
                    CardId = userCard.Id
                };
                return sleeveRepo.CreateNewDeckSleeve(sleeveInfo);
            }

            if (additionInfo.CollectionType == "Binder")
            {
                var binderRepo = new BinderRepo();
                var binderToAddTo = binderRepo.GetBinderByBinderId(additionInfo.CollectionId);
                var sleeveInfo = new
                {
                    BinderId = binderToAddTo.Id,
                    CardId = userCard.Id
                };
                return sleeveRepo.CreateNewBinderSleeve(sleeveInfo);
            }
            return false;
        }
    }
}
