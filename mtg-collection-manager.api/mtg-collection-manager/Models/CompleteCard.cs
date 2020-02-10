using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mtg_collection_manager.Models
{
    public class CompleteCard
    {
        public Guid Id { get; set; }
        public Guid ScryId { get; set; }
        public Guid OracleId { get; set; }
        public string Name { get; set; }
        public string Lang { get; set; }
        public DateTimeOffset ReleasedAt { get; set; }
        public string Uri { get; set; }
        public string ScryfallUri { get; set; }
        public string Layout { get; set; }
        public bool HighresImage { get; set; }
        public string ManaCost { get; set; }
        public long Cmc { get; set; }
        public string TypeLine { get; set; }
        public bool Reserved { get; set; }
        public bool Foil { get; set; }
        public bool Nonfoil { get; set; }
        public bool Oversized { get; set; }
        public bool Promo { get; set; }
        public bool Reprint { get; set; }
        public bool Variation { get; set; }
        public string Set { get; set; }
        public string SetName { get; set; }
        public string SetType { get; set; }
        public string SetUri { get; set; }
        public string SetSearchUri { get; set; }
        public string ScryfallSetUri { get; set; }
        public string RulingsUri { get; set; }
        public string PrintsSearchUri { get; set; }
        public long CollectorNumber { get; set; }
        public bool Digital { get; set; }
        public string Rarity { get; set; }
        public Guid CardBackId { get; set; }
        public string Artist { get; set; }
        public Guid IllustrationId { get; set; }
        public string BorderColor { get; set; }
        public string Frame { get; set; }
        public bool FullArt { get; set; }
        public bool Textless { get; set; }
        public bool Booster { get; set; }
        public bool StorySpotlight { get; set; }
        public long EdhrecRank { get; set; }
        public List<long> MultiverseIds { get; set; }
        public List<string> Colors { get; set; }
        public List<string> ColorIdentity { get; set; }
        public List<string> Games { get; set; }
        public List<Guid> ArtistIds { get; set; }
        public List<CompleteCardFace> CardFaces { get; set; }
        public CompleteCardLegalities Legalities { get; set; }
        public CompleteCardPrices Prices { get; set; }
        public CompleteCardRelatedUris RelatedUris { get; set; }
        public CompleteCardImageUris ImageUris { get; set; }
        public CompleteCardPurchaseUris PurchaseUris { get; set; }
    }

    public class CompleteCardMultiverseId
    {
        public long MultiverseId { get; set; }
    }

    public partial class CompleteCardFace
    {
        public Guid Id { get; set; }
        public Guid CardId { get; set; }
        public string Object { get; set; }
        public string Name { get; set; }
        public string PrintedName { get; set; }
        public string ManaCost { get; set; }
        public string TypeLine { get; set; }
        public string PrintedTypeLine { get; set; }
        public string OracleText { get; set; }
        public string PrintedText { get; set; }
        public string Artist { get; set; }
        public Guid ArtistId { get; set; }
        public Guid IllustrationId { get; set; }
    }

    public partial class CompleteCardImageUris
    {
        public Guid Id { get; set; }
        public Guid CardId { get; set; }
        public string Small { get; set; }
        public string Normal { get; set; }
        public string Large { get; set; }
        public string Png { get; set; }
        public string ArtCrop { get; set; }
        public string BorderCrop { get; set; }
    }

    public partial class CompleteCardLegalities
    {
        public Guid Id { get; set; }
        public Guid CardId { get; set; }
        public string Standard { get; set; }
        public string Future { get; set; }
        public string Historic { get; set; }
        public string Pioneer { get; set; }
        public string Modern { get; set; }
        public string Legacy { get; set; }
        public string Pauper { get; set; }
        public string Vintage { get; set; }
        public string Penny { get; set; }
        public string Commander { get; set; }
        public string Brawl { get; set; }
        public string Duel { get; set; }
        public string Oldschool { get; set; }
    }

    public partial class CompleteCardPrices
    {
        public Guid Id { get; set; }
        public Guid CardId { get; set; }

        public string Usd { get; set; }
        public string UsdFoil { get; set; }
        public string Eur { get; set; }
        public string Tix { get; set; }
    }

    public partial class CompleteCardPurchaseUris
    {
        public Guid Id { get; set; }
        public Guid CardId { get; set; }
        public string Tcgplayer { get; set; }
        public string Cardmarket { get; set; }
        public string Cardhoarder { get; set; }
    }

    public partial class CompleteCardRelatedUris
    {
        public Guid Id { get; set; }
        public Guid CardId { get; set; }
        public string Gatherer { get; set; }
        public string TcgplayerDecks { get; set; }
        public string Edhrec { get; set; }
        public string Mtgtop8 { get; set; }
    }
}
