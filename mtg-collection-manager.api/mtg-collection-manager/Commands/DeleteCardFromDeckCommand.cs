using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mtg_collection_manager.Commands
{
    public class DeleteCardFromDeckCommand
    {
        public Guid DeckId { get; set; }
        public Guid CardId { get; set; }
    }
}
