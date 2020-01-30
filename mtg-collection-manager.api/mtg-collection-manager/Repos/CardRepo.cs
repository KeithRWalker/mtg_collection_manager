using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mtg_collection_manager.Commands;
using Newtonsoft.Json;
using RestSharp;

namespace mtg_collection_manager.Repos
{
    public class CardRepo
    {
        public readonly string _apiConnection = "https://api.scryfall.com";

        public readonly string _randomCard = "/cards/random";


        public object GetRandomCard()
        {
            var client = new RestClient(_apiConnection);

            var request = new RestRequest(_randomCard, DataFormat.Json);

            var response = client.Get(request).Content;

            var card = JsonConvert.DeserializeObject(response);

            return card;
        }

        public object BrowsePage(int pageNum)
        {
            var apiUrl = $"/cards?page={pageNum}";

            var client = new RestClient(_apiConnection);

            var request = new RestRequest(apiUrl, DataFormat.Json);

            var response = client.Get(request).Content;

            var collection = JsonConvert.DeserializeObject(response);

            return collection;
        }

        public object SubmitSearch(SearchParameterCommand searchObject)
        {


            var searchQuery = $"/cards/search?order=name&q=name={searchObject.Name}";

            var client = new RestClient(_apiConnection);

            var request = new RestRequest(searchQuery, DataFormat.Json);

            var response = client.Get(request).Content;

            var results = JsonConvert.DeserializeObject(response);

            return results;
        }
    }
}
