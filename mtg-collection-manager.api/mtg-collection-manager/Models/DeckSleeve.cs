using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mtg_collection_manager.Models
{
    public class DeckSleeve
    {
        public Guid Id { get; set; }
        public Guid DeckId { get; set; }
        public Guid CardId { get; set; }
    }
}
