﻿// <auto-generated />
//
// To parse this JSON data, add NuGet 'Newtonsoft.Json' then do:
//
//    using mtg_collection_manager;
//
//    var SearchResults = SearchResults.FromJson(jsonString);

namespace mtg_collection_manager.Models
{
    using System;
    using System.Collections.Generic;

    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    public partial class SearchResults
    {
        [JsonProperty("object")]
        public string Object { get; set; }

        [JsonProperty("total_cards")]
        public long TotalCards { get; set; }

        [JsonProperty("has_more")]
        public bool HasMore { get; set; }

        [JsonProperty("data")]
        public List<Card> Cards { get; set; }
    }

    public partial class SearchResults
    {
        public static SearchResults FromJson(string json) => JsonConvert.DeserializeObject<SearchResults>(json, mtg_collection_manager.Models.Json.Converter.Settings);
    }
}