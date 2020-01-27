using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mtg_collection_manager.Commands
{
    public class AddUserCommand
    {
        public string Id { get; set; }
        public string FirebaseUid { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
