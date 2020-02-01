using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mtg_collection_manager.Models;
using mtg_collection_manager.Models.Json;
using Newtonsoft.Json;
using RestSharp;

namespace mtg_collection_manager.Repos
{
    public class CatalogRepo
    {
        public readonly RestClient _client = new RestClient("https://api.scryfall.com");

        internal Catalog GetCatalog(string catalogName)
        {
            var requestPath = $"/catalog/{catalogName}";

            var request = new RestRequest(requestPath, DataFormat.Json);

            var jsonString = _client.Get(request).Content;

            var catalogData = Catalog.FromJson(jsonString);

            return catalogData;
        }
    }
}