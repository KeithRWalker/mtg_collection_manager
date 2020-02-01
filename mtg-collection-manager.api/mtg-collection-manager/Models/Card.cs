using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mtg_collection_manager.Models.Json;

namespace mtg_collection_manager.Models
{
    using System;
    using System.Collections.Generic;

    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    public partial class Card
    {
        [JsonProperty("object")]
        public string Object { get; set; }

        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("oracle_id")]
        public Guid OracleId { get; set; }

        [JsonProperty("multiverse_ids")]
        public List<long> MultiverseIds { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("lang")]
        public string Lang { get; set; }

        [JsonProperty("released_at")]
        public DateTimeOffset ReleasedAt { get; set; }

        [JsonProperty("uri")]
        public Uri Uri { get; set; }

        [JsonProperty("scryfall_uri")]
        public Uri ScryfallUri { get; set; }

        [JsonProperty("layout")]
        public string Layout { get; set; }

        [JsonProperty("highres_image")]
        public bool HighresImage { get; set; }

        [JsonProperty("image_uris")]
        public ImageUris ImageUris { get; set; }

        [JsonProperty("mana_cost")]
        public string ManaCost { get; set; }

        [JsonProperty("cmc")]
        public long Cmc { get; set; }

        [JsonProperty("type_line")]
        public string TypeLine { get; set; }

        [JsonProperty("colors")]
        public List<string> Colors { get; set; }

        [JsonProperty("color_identity")]
        public List<string> ColorIdentity { get; set; }

        [JsonProperty("card_faces")]
        public List<CardFace> CardFaces { get; set; }

        [JsonProperty("legalities")]
        public Legalities Legalities { get; set; }

        [JsonProperty("games")]
        public List<string> Games { get; set; }

        [JsonProperty("reserved")]
        public bool Reserved { get; set; }

        [JsonProperty("foil")]
        public bool Foil { get; set; }

        [JsonProperty("nonfoil")]
        public bool Nonfoil { get; set; }

        [JsonProperty("oversized")]
        public bool Oversized { get; set; }

        [JsonProperty("promo")]
        public bool Promo { get; set; }

        [JsonProperty("reprint")]
        public bool Reprint { get; set; }

        [JsonProperty("variation")]
        public bool Variation { get; set; }

        [JsonProperty("set")]
        public string Set { get; set; }

        [JsonProperty("set_name")]
        public string SetName { get; set; }

        [JsonProperty("set_type")]
        public string SetType { get; set; }

        [JsonProperty("set_uri")]
        public Uri SetUri { get; set; }

        [JsonProperty("set_search_uri")]
        public Uri SetSearchUri { get; set; }

        [JsonProperty("scryfall_set_uri")]
        public Uri ScryfallSetUri { get; set; }

        [JsonProperty("rulings_uri")]
        public Uri RulingsUri { get; set; }

        [JsonProperty("prints_search_uri")]
        public Uri PrintsSearchUri { get; set; }

        [JsonProperty("collector_number")]
        [JsonConverter(typeof(ParseStringConverter))]
        public long CollectorNumber { get; set; }

        [JsonProperty("digital")]
        public bool Digital { get; set; }

        [JsonProperty("rarity")]
        public string Rarity { get; set; }

        [JsonProperty("card_back_id")]
        public Guid CardBackId { get; set; }

        [JsonProperty("artist")]
        public string Artist { get; set; }

        [JsonProperty("artist_ids")]
        public List<Guid> ArtistIds { get; set; }

        [JsonProperty("illustration_id")]
        public Guid IllustrationId { get; set; }

        [JsonProperty("border_color")]
        public string BorderColor { get; set; }

        [JsonProperty("frame")]
        [JsonConverter(typeof(ParseStringConverter))]
        public long Frame { get; set; }

        [JsonProperty("full_art")]
        public bool FullArt { get; set; }

        [JsonProperty("textless")]
        public bool Textless { get; set; }

        [JsonProperty("booster")]
        public bool Booster { get; set; }

        [JsonProperty("story_spotlight")]
        public bool StorySpotlight { get; set; }

        [JsonProperty("edhrec_rank")]
        public long EdhrecRank { get; set; }

        [JsonProperty("prices")]
        public Prices Prices { get; set; }

        [JsonProperty("related_uris")]
        public RelatedUris RelatedUris { get; set; }

        [JsonProperty("purchase_uris")]
        public PurchaseUris PurchaseUris { get; set; }
    }

    public partial class CardFace
    {
        [JsonProperty("object")]
        public string Object { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("printed_name")]
        public string PrintedName { get; set; }

        [JsonProperty("mana_cost")]
        public string ManaCost { get; set; }

        [JsonProperty("type_line")]
        public string TypeLine { get; set; }

        [JsonProperty("printed_type_line")]
        public string PrintedTypeLine { get; set; }

        [JsonProperty("oracle_text")]
        public string OracleText { get; set; }

        [JsonProperty("printed_text")]
        public string PrintedText { get; set; }

        [JsonProperty("artist")]
        public string Artist { get; set; }

        [JsonProperty("artist_id")]
        public Guid ArtistId { get; set; }

        [JsonProperty("illustration_id", NullValueHandling = NullValueHandling.Ignore)]
        public Guid? IllustrationId { get; set; }
    }

    public partial class ImageUris
    {
        [JsonProperty("small")]
        public Uri Small { get; set; }

        [JsonProperty("normal")]
        public Uri Normal { get; set; }

        [JsonProperty("large")]
        public Uri Large { get; set; }

        [JsonProperty("png")]
        public Uri Png { get; set; }

        [JsonProperty("art_crop")]
        public Uri ArtCrop { get; set; }

        [JsonProperty("border_crop")]
        public Uri BorderCrop { get; set; }
    }

    public partial class Legalities
    {
        [JsonProperty("standard")]
        public string Standard { get; set; }

        [JsonProperty("future")]
        public string Future { get; set; }

        [JsonProperty("historic")]
        public string Historic { get; set; }

        [JsonProperty("pioneer")]
        public string Pioneer { get; set; }

        [JsonProperty("modern")]
        public string Modern { get; set; }

        [JsonProperty("legacy")]
        public string Legacy { get; set; }

        [JsonProperty("pauper")]
        public string Pauper { get; set; }

        [JsonProperty("vintage")]
        public string Vintage { get; set; }

        [JsonProperty("penny")]
        public string Penny { get; set; }

        [JsonProperty("commander")]
        public string Commander { get; set; }

        [JsonProperty("brawl")]
        public string Brawl { get; set; }

        [JsonProperty("duel")]
        public string Duel { get; set; }

        [JsonProperty("oldschool")]
        public string Oldschool { get; set; }
    }

    public partial class Prices
    {
        [JsonProperty("usd")]
        public object Usd { get; set; }

        [JsonProperty("usd_foil")]
        public object UsdFoil { get; set; }

        [JsonProperty("eur")]
        public object Eur { get; set; }

        [JsonProperty("tix")]
        public object Tix { get; set; }
    }

    public partial class PurchaseUris
    {
        [JsonProperty("tcgplayer")]
        public Uri Tcgplayer { get; set; }

        [JsonProperty("cardmarket")]
        public Uri Cardmarket { get; set; }

        [JsonProperty("cardhoarder")]
        public Uri Cardhoarder { get; set; }
    }

    public partial class RelatedUris
    {
        [JsonProperty("gatherer")]
        public Uri Gatherer { get; set; }

        [JsonProperty("tcgplayer_decks")]
        public Uri TcgplayerDecks { get; set; }

        [JsonProperty("edhrec")]
        public Uri Edhrec { get; set; }

        [JsonProperty("mtgtop8")]
        public Uri Mtgtop8 { get; set; }
    }

    public partial class Card
    {
        public static Card FromJson(string json) => JsonConvert.DeserializeObject<Card>(json, mtg_collection_manager.Models.Json.Converter.Settings);
    }
}

