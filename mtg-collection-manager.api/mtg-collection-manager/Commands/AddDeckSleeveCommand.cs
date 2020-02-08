using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mtg_collection_manager.Commands
{
    public class AddDeckSleeveCommand
    {
        public string DeckId { get; set; }
        public string CardId { get; set; }
    }
}
