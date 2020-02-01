﻿using System;
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
    public class CardRepo
    {
        public readonly RestClient _client = new RestClient("https://api.scryfall.com");


        public object GetRandomCard()
        {
            var requestPath = "/cards/random";

            var request = new RestRequest(requestPath, DataFormat.Json);

            var response = _client.Get(request).Content;

            var card = JsonConvert.DeserializeObject(response);

            return card;
        }

        public object BrowsePage(int pageNum)
        {
            var requestPath = $"/cards?page={pageNum}";

            var request = new RestRequest(requestPath, DataFormat.Json);

            var response = _client.Get(request).Content;

            var collection = JsonConvert.DeserializeObject(response);

            return collection;
        }

        internal Card GetCardDetails(Guid cardId)
        {
            var requestPath = $"/cards/{cardId}";
            var request = new RestRequest(requestPath, DataFormat.Json);
            var jsonString = _client.Get(request).Content;
            var cardData = Card.FromJson(jsonString);
            return cardData;
        }
    }
}
