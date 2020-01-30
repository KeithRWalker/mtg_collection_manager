using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mtg_collection_manager.Repos;
using QuickType;

namespace mtg_collection_manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SymbologyController : FirebaseEnabledController
    {
/*        [HttpGet("symbology")]
        [Authorize]
        public IActionResult<Symbology> GetAllSymbols()
        {
            var _repo = new SymbologyRepo();
            return _repo.GetAllSymbols();
        }*/
    }
}