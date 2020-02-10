﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using mtg_collection_manager.Models;

namespace mtg_collection_manager.Repos
{
    public class SleeveRepo
    {
        string _connectionString = @"Server=localhost;
                                                             Database=MTG;
                                                                 Trusted_Connection=True;";
        public bool CreateNewBinderSleeve(object binderSleeve)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [BinderSleeve]
                                        (   [BinderId],   [CardId]   )
                                    OUTPUT INSERTED.*
                                    VALUES
                                        (   @binderId,   @cardId   )";

                return db.Execute(sql, binderSleeve) == 1;
            }
        }

        public bool CreateNewDeckSleeve(object deckSleeve)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [DeckSleeve]
                                        (   [DeckId],   [CardId]   )
                                    OUTPUT INSERTED.*
                                    VALUES
                                        (   @deckId,   @cardId   )";

                return db.Execute(sql, deckSleeve) == 1;
            }
        }

        public IEnumerable<BinderSleeve> GetAllBinderSleevesByBinderId(string binderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT * FROM [BinderSleeve] WHERE [BinderId] = @binderId";
                var parameters = new {BinderId = binderId};
                return db.Query<BinderSleeve>(sql, parameters);
            }
        }

        public IEnumerable<DeckSleeve> GetAllDeckSleevesByDeckId(string deckId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT * FROM [DeckSleeve] WHERE [DeckId] = @deckId";
                var parameters = new { DeckId = deckId };
                return db.Query<DeckSleeve>(sql, parameters);
            }
        }
    }
}
