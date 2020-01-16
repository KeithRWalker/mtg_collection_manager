using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mtg_collection_manager.Models
{
    public class Card
    {
        public string Id { get; set; }
        public string ScryfallId { get; set; }
        public int Quantity { get; set; }
    }
}
