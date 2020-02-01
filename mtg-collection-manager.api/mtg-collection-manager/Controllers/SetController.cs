using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mtg_collection_manager.Models;
using mtg_collection_manager.Repos;

namespace mtg_collection_manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SetController : FirebaseEnabledController
    {
        private readonly SetRepo _setRepo = new SetRepo();
        [HttpGet("names")]
        public List<SimpleSet> GetSetNames()
        {
            return _setRepo.GetSetNames();
        }
    }
}