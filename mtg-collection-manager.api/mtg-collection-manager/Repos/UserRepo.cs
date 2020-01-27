using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using mtg_collection_manager.Models;

namespace mtg_collection_manager.Repos
{
    public class UserRepo
    {
        string _connectionString = @"Server=localhost;
                                     Database=MTG;
                                     Trusted_Connection=True;";

        public IEnumerable<User> GetAllUsers()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "SELECT * FROM [User]";
                var resp = db.Query<User>(sql);
                return resp;
            }
        }

        public User CreateNewUser(User newUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [User]
                                ([FirebaseUid], [Username], [Email], [FirstName], [LastName])
                                OUTPUT INSERTED.*
                            VALUES
                                (@firebaseUid, @userName, @email, @firstName, @lastName)";
                var user = db.QueryFirst<User>(sql, newUser);
                return user;
            }
        }

    }
}
