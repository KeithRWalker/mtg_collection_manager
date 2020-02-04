using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mtg_collection_manager.Models;
using RestSharp;

namespace mtg_collection_manager.Repos
{
    public class SetRepo
    {
        public readonly RestClient _client = new RestClient("https://api.scryfall.com");

        public List<SimpleSet> GetSetNames()
        {
            var requestPath = $"/sets";

            var request = new RestRequest(requestPath, DataFormat.Json);

            var jsonString = _client.Get(request).Content;

            var setData = SetContainer.FromJson(jsonString);

            var sets = setData.Sets;

            var simpleSets = new List<SimpleSet>();

            foreach (var set in sets)
            {
                var simpleSet = new SimpleSet
                {
                    Name = set.Name,
                    Id = set.Id,
                    SetCode = set.Code
                };
                simpleSets.Add(simpleSet);
            }

            return simpleSets;
        }
    }
}