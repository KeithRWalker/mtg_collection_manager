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
    public class SymbolController : FirebaseEnabledController
    {
        private readonly SymbolRepo _symbolRepo = new SymbolRepo();
        [HttpGet]
        public SymbolContainer GetAllSymbols()
        {
            return _symbolRepo.GetAllSymbols();
        }

        [HttpGet("simple")]
        public List<SimpleSymbol> GetSimpleSymbols()
        {
            return _symbolRepo.GetSimpleSymbols();
        }

        [HttpGet("simple/basic")]
        public List<SimpleSymbol> GetBasicMana()
        {
            return _symbolRepo.GetBasicMana();
        }

        [HttpGet("simple/double")]
        public List<SimpleSymbol> GetDoubleMana()
        {
            return _symbolRepo.GetDoubleMana();
        }

        [HttpPost("codes")]
        [Authorize]
        public List<Uri> GetSymbolsForSymbolCodes(GetManaFromSymbolCode symbolCodes)
        {
            return _symbolRepo.GetUrisForSymbolCodes(symbolCodes.SymbolCodes);
        }
    }
}