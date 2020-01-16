using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mtg_collection_manager.Repos;

namespace mtg_collection_manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        // GET: api/Card
        [HttpGet("random")]
        public object Get()
        {
            var _repo = new CardRepo();

            return _repo.GetRandomCard();
        }
    }
}
