using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mtg_collection_manager.Models.Json
{
    public static class Serialize
    {
        public static string ToJson(this SearchResults self) => JsonConvert.SerializeObject(self, mtg_collection_manager.Models.Json.Converter.Settings);
    }
}
