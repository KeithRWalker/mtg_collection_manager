using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mtg_collection_manager.Models;
using mtg_collection_manager.Models.Json;
using mtg_collection_manager.Repos;

namespace mtg_collection_manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController : ControllerBase
    {
        private readonly CatalogRepo _catalogRepo = new CatalogRepo();

        [HttpGet("creatures")]
        public Catalog GetCatalog()
        {
            var catalogName = "creature-types";
            return _catalogRepo.GetCatalog(catalogName);
        }

/*        [HttpGet("creatures")]
        public Catalog GetCatalog()
        {
            var catalogName = "creature-types";
            return _catalogRepo.GetCatalog(catalogName);
        }*/

    }
}

/*
/catalog/card-names--
/catalog/artist-names--
/catalog/word-bank--
/catalog/creature-types--
/catalog/planeswalker-types
/catalog/land-types--
/catalog/artifact-types--
/catalog/enchantment-types--
/catalog/spell-types--
/catalog/powers--
/catalog/toughnesses--
/catalog/loyalties
/catalog/watermarks

 [HttpGet("cards")]
        public Catalog GetCardNames()
        {
            var catalogName = "card-names";
            return _catalogRepo.GetCatalog(catalogName);
        }

        [HttpGet("artists")]
        public object GetArtistNames()
        {
            var catalogName = "artists";
            return _catalogRepo.GetCatalog(catalogName);
        }

        [HttpGet("words")]
        public object GetWordBank()
        {
            var catalogName = "words";
            _catalogRepo.GetCatalog(catalogName);
            return new { };

        }

        [HttpGet("creatures")]
        public object GetCreatures()
        {
            var catalogName = "creature-types";
            _catalogRepo.GetCatalog(catalogName);
            _catalogRepo.GetCatalog()

        }

        [HttpGet("planeswalkers")]
        public object GetPlanesWalkers()
        {
            var catalogName = "planeswalker-types";
            _catalogRepo.GetCatalog(catalogName);
            return new { };

        }

        [HttpGet("lands")]
        public object GetLands()
        {
            var catalogName = "land-types";
            _catalogRepo.GetCatalog(catalogName);
            return new { };

        }

        [HttpGet("artifacts")]
        public object GetArtifacts()
        {
            var catalogName = "artifact-types";
            _catalogRepo.GetCatalog(catalogName);
            return new { };

        }

        [HttpGet("enchantments")]
        public object GetEnchantments()
        {
            var catalogName = "enchantment-types";
            _catalogRepo.GetCatalog(catalogName);
            return new { };

        }

        [HttpGet("spells")]
        public object GetSpells()
        {
            var catalogName = "spell-types";
            _catalogRepo.GetCatalog(catalogName);
            return new { };

        }

        [HttpGet("powers")]
        public object GetPowers()
        {
            var catalogName = "powers";
            _catalogRepo.GetCatalog(catalogName);
            return new { };

        }

        [HttpGet("toughness")]
        public object GetToughness()
        {
            var catalogName = "toughness";
            _catalogRepo.GetCatalog(catalogName);
            return new { };

        }

        [HttpGet("loyalties")]
        public object GetLoyalties()
        {
            var catalogName = "loyalties";
            _catalogRepo.GetCatalog(catalogName);
            return new { };

        }

        [HttpGet("watermarks")]
        public object GetWatermarks()
        {
            var catalogName = "watermarks";
            _catalogRepo.GetCatalog(catalogName);
            return new { };
        }
     
     
     
     */
