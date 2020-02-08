using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

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
    }
}
