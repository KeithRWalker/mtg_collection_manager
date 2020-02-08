using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mtg_collection_manager.Models
{
    public class Deck
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
    }
}
