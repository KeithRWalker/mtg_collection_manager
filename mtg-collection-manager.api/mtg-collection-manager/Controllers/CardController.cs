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
        public Card GetCardDetails(Guid cardId)
        {
            var matchingCard = _cardRepo.GetCardDetails(cardId);

            return matchingCard;
        }
    }
}
