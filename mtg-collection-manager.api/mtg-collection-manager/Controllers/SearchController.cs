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
    public class SearchController : FirebaseEnabledController
    {
        private readonly SearchRepo _searchRepo = new SearchRepo();

        [HttpPost("search")]
        [Authorize]
        public SearchResults SubmitSearch(SearchParameterCommand searchObject)
        {
            return _searchRepo.SubmitSearch(searchObject);
        }


        [HttpPost("public")]
        public SearchResults SubmitNewSearch(SearchParameterCommand searchObject)
        {
            var cardResp = _searchRepo.SubmitNewSearch(searchObject);

            return cardResp;
        }
    }
}