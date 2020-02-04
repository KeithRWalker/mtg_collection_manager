using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mtg_collection_manager.Commands;
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

        [HttpGet("{catalogName}")]
        public Catalog GetCatalog(string catalogName)
        {
            return _catalogRepo.GetCatalog(catalogName);
        }
    }
}