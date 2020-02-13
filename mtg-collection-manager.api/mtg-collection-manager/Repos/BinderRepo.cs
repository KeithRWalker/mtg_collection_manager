using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using mtg_collection_manager.Models;
using Remotion.Linq.Clauses;

namespace mtg_collection_manager.Repos
{
    public class BinderRepo
    {
        string _connectionString = @"Server=localhost;
                                                            Database=MTG;
                                                                Trusted_Connection=True;";

        public Binder CreateBinder(Binder binderToAdd)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [Binder]
                                        (   [UserId],   [Name],   [Type],   [Description],   [Tags],   [TotalPrice]   )
                                    OUTPUT INSERTED.*
                                    VALUES
                                        (   @userId,   @name,   @type,   @description,  @tags,   @totalPrice   )";

                var binder = db.QueryFirstOrDefault(sql, binderToAdd);
                return binder;
            }
        }

        public Binder GetBinderByBinderId(string binderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "SELECT * FROM [Binder] WHERE [Id] = @binderId";
                var parameters = new { binderId };

                var matchedBinder = db.QueryFirstOrDefault<Binder>(sql, parameters);

                return matchedBinder;
            }
        }

        public IEnumerable<Binder> GetUserBinders(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT * FROM [Binder] WHERE [UserId] = @userId";

                var parameters = new { UserId = userId };

                var binders = db.Query<Binder>(sql, parameters);
                var validBinders = new List<Binder>();
                foreach (var binder in binders)
                {
                    if (binder.Type != "hidden")
                    {
                        validBinders.Add(binder);
                    }
                }
                return validBinders;
            }
        }

        public bool CreateHiddenBinder(Guid userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [dbo].[Binder]
                                        (   [UserId],  [Name],  [Type], [Description]   )
                                    VALUES
                                        (   @userId, @name,  @type, @description  )";

                var hiddenBinder = new 
                {
                    UserId = userId,
                    Name = "placeholder",
                    Type = "hidden",
                    Description = "placeholder"
                };

                return db.Execute(sql, hiddenBinder) == 1;
            }
        }

        public Binder AddNewBinder(Binder binderToAdd)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [Binder]
                                        (   [UserId],   [Name],   [Type],   [Description],   [Tags],   [TotalValue]   )
                                    OUTPUT INSERTED.*
                                    VALUES
                                        (   @userId,   @name,   @type,   @description,   @tags,   @totalValue   )";

                var binder = db.QueryFirst<Binder>(sql, binderToAdd);
                return binder;
            }
        }
    }
}
