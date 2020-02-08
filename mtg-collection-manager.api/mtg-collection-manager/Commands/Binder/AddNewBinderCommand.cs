using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mtg_collection_manager.Commands.Binder
{
    public class AddNewBinderCommand
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Tags { get; set; }
        public int TotalValue { get; set; }
    }
}
