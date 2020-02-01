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
    public class SymbolController : FirebaseEnabledController
    {
        private readonly SymbolRepo _symbolRepo = new SymbolRepo();
        [HttpGet]
        public Symbol GetAllSymbols()
        {
            var symbols = _symbolRepo.GetAllSymbols();
            return symbols;
        }

        [HttpGet("simple")]
        public List<SymbolValues> GetSimpleSymbols()
        {
            var symbolUris = _symbolRepo.GetSimpleSymbols();
            return symbolUris;
        }
    }
}