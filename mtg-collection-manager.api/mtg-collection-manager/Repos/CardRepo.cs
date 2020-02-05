using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
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

        string _connectionString = @"Server=localhost;
                                                            Database=MTG;
                                                                Trusted_Connection=True;";


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

        internal UserCard AttachUserCardToUser(UserCard newCard)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [Card]
                                        (   [ScryId],   [Name]   )
                                    OUTPUT INSERTED.*
                                    VALUES
                                        (   @scryId,   @name   )";
                var addedCard = db.QueryFirstOrDefault(sql, newCard);
                return addedCard;
            }
        }
    }
}
