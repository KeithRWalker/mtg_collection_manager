using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mtg_collection_manager.Commands
{
    public class AttachCardToUserCommand
    {
        public string ScryId { get; set; }
        public string CollectionId { get; set; }
        public string CollectionType { get; set; }
    }
}
