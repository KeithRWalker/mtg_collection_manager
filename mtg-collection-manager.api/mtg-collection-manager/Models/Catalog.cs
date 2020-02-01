namespace mtg_collection_manager.Models.Json
{
    using System;
    using System.Collections.Generic;

    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    public partial class Catalog
    {
        [JsonProperty("object")]
        public string Object { get; set; }

        [JsonProperty("uri")]
        public Uri Uri { get; set; }

        [JsonProperty("total_values")]
        public long TotalValues { get; set; }

        [JsonProperty("data")]
        public List<string> Data { get; set; }
    }

    public partial class Catalog
    {
        public static Catalog FromJson(string json) => JsonConvert.DeserializeObject<Catalog>(json, mtg_collection_manager.Models.Json.Converter.Settings);
    }
}