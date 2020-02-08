using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using mtg_collection_manager.Models;

namespace mtg_collection_manager.Repos
{
    public class DeckRepo
    {
        string _connectionString = @"Server=localhost;
                                                             Database=MTG;
                                                                 Trusted_Connection=True;";


        public IEnumerable<Deck> GetUserDecks(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT * FROM [Deck] WHERE [UserId] = @userId";
                var parameters = new { UserId = userId };

                var decks = db.Query<Deck>(sql, parameters);
                var validDecks = new List<Deck>();
                foreach (var deck in decks)
                {
                    if (deck.Type != "hidden")
                    {
                        validDecks.Add(deck);
                    }
                }
                return validDecks;
            }
        }


        public Deck GetDeckByDeckId(string deckId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "SELECT * FROM [Deck] WHERE [Id] = @deckId";
                var parameters = new { deckId };
                var matchedDeck = db.QueryFirstOrDefault<Deck>(sql, parameters);
                return matchedDeck;
            }
        }


        public bool CreateHiddenDeck(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [dbo].[Deck]
                                        (  [UserId],   [Name],   [Type], [Description]  )
                                    VALUES
                                        (  @userId,   @name,   @type,  @description  )";

                var hiddenDeck = new Deck
                {
                    UserId = userId,
                    Name = "placeholder",
                    Type = "hidden",
                    Description = "placeholder"
                };
                return db.Execute(sql, hiddenDeck) == 1;
            }
        }


        public Deck AddNewDeck(Deck deckToAdd)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [Deck]
                                        (   [UserId],   [Name],   [Type],   [Description],   [Rating]   )
                                    OUTPUT INSERTED.*
                                    VALUES
                                        (   @userId,   @name,   @type,   @description,   @rating   )";

                var deck = db.QueryFirst<Deck>(sql, deckToAdd);
                return deck;
            }
        }
    }
}
