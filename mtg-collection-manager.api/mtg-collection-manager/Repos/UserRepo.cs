using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using mtg_collection_manager.Commands;
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

        public void checkIfInDB(string fbId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT * FROM [User] WHERE [FirebaseUid] = @firebaseUid";
                var parameters =  new {FirebaseUid = fbId};
                var query = db.QueryFirstOrDefault<User>(sql, parameters);
                if (query != null)
                {
                    return;
                }
                if (query == null)
                {
                    var addSql = @"INSERT INTO [User] ( [FirebaseUid] ) VALUES (@firebaseUid)";

                    db.Execute(addSql, parameters);
                    var created = GetUserByFirebaseUid(parameters.FirebaseUid);
                    var _deckRepo = new DeckRepo();
                    var _binderRepo = new BinderRepo();
                    _deckRepo.CreateHiddenDeck(created.Id);
                    _binderRepo.CreateHiddenBinder(created.Id);
                }
            }
        }

        public void CreateNewUser(AddUserCommand newUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var user = new
                {
                    FirebaseUid = newUser.FirebaseUid,
                    UserName = newUser.UserName,
                    Email = newUser.Email,
                    FirstName = newUser.FirstName,
                    LastName = newUser.LastName,
                };
                var sql = @"INSERT INTO [User]
                                ([FirebaseUid], [Username], [Email], [FirstName], [LastName])
                            VALUES
                                (@firebaseUid, @userName, @email, @firstName, @lastName)";
                db.Execute(sql, user);
                var created = GetUserByFirebaseUid(user.FirebaseUid);
                var _deckRepo = new DeckRepo();
                var _binderRepo = new BinderRepo();
                _deckRepo.CreateHiddenDeck(created.Id);
                _binderRepo.CreateHiddenBinder(created.Id);
            }
        }

        public User GetUserByFirebaseUid(string firebaseUid)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT * FROM [User] WHERE [FirebaseUid] = @firebaseUid";
                var user = db.QueryFirstOrDefault<User>(sql, new {FirebaseUid = firebaseUid});
                return user;
            }
        }

    }
}
