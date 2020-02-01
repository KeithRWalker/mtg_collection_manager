using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mtg_collection_manager.Commands;
using mtg_collection_manager.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Schema;
using Newtonsoft.Json.Schema.Generation;
using RestSharp;

namespace mtg_collection_manager.Repos
{
    public class SearchRepo
    {
        public readonly RestClient _client = new RestClient("https://api.scryfall.com");

        public SearchResults SubmitSearch(SearchParameterCommand searchObject)
        {
            var requestPath = $"/cards/search?order=name&q=name={searchObject.Name}";

            var request = new RestRequest(requestPath, DataFormat.Json);

            var response = _client.Get(request).Content;

            var searchResults = SearchResults.FromJson(response);


            return searchResults;
        }

        public SearchResults SubmitNewSearch(SearchParameterCommand searchObject)
        {
            var requestPath = $"/cards/search?order=name&q=name={searchObject.Name}";

            var request = new RestRequest(requestPath, DataFormat.Json);

            var response = _client.Get(request).Content;

            var searchResults = SearchResults.FromJson(response);


            return searchResults;
        }
    }
}
