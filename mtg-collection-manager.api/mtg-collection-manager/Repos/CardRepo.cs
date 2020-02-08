using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Dapper;
using mtg_collection_manager.Commands;
using mtg_collection_manager.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Schema;
using Newtonsoft.Json.Schema.Generation;
using RestSharp;

namespace mtg_collection_manager.Repos
{
    public class CardRepo
    {
        public readonly RestClient _client = new RestClient("https://api.scryfall.com");

        string _connectionString = @"Server=localhost;
                                                            Database=MTG;
                                                                Trusted_Connection=True;";


        public object GetRandomCard()
        {
            var requestPath = "/cards/random";

            var request = new RestRequest(requestPath, DataFormat.Json);

            var response = _client.Get(request).Content;

            var card = JsonConvert.DeserializeObject(response);

            return card;
        }

        public object BrowsePage(int pageNum)
        {
            var requestPath = $"/cards?page={pageNum}";

            var request = new RestRequest(requestPath, DataFormat.Json);

            var response = _client.Get(request).Content;

            var collection = JsonConvert.DeserializeObject(response);

            return collection;
        }

        internal Card GetCardDetails(string cardId)
        {
            var requestPath = $"/cards/{cardId}";
            var request = new RestRequest(requestPath, DataFormat.Json);
            var jsonString = _client.Get(request).Content;
            var cardData = Card.FromJson(jsonString);
            return cardData;
        }

        internal UserCard AttachCardToUser(Card scryCard)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [Card]
                                        (      
                                            [ScryId],
                                            [Name],
                                            [OracleId],
                                            [ReleasedAt],
                                            [Uri],
                                            [ScryfallUri],
                                            [Layout],
                                            [HighresImage],
                                            [ManaCost],
                                            [Cmc],
                                            [TypeLine],
                                            [Reserved],
                                            [Foil],
                                            [Nonfoil],
                                            [Oversized],
                                            [Promo],
                                            [Reprint],
                                            [Variation],
                                            [Set],
                                            [SetName],
                                            [SetType],
                                            [ScryfallSetUri],
                                            [RulingsUri],
                                            [PrintsSearchUri],
                                            [CollectorNumber],
                                            [Digital],
                                            [Rarity],
                                            [CardBackId],
                                            [Artist],
                                            [IllustrationId],
                                            [BorderColor],
                                            [Frame],
                                            [FullArt],
                                            [Textless],
                                            [Booster],
                                            [StorySpotlight],
                                            [EdhrecRank]
                                        )
                                    OUTPUT INSERTED.*
                                    VALUES
                                        (   
                                            @scryId,
                                            @name,
                                            @oracleId,
                                            @releasedAt,
                                            @uri,
                                            @scryfallUri,
                                            @layout,
                                            @highresImage,
                                            @manaCost,
                                            @cmc,
                                            @typeLine,
                                            @reserved,
                                            @foil,
                                            @nonfoil,
                                            @oversized,
                                            @promo,
                                            @reprint,
                                            @variation,
                                            @set,
                                            @setName,
                                            @setType,
                                            @scryfallSetUri,
                                            @rulingsUri,
                                            @printsSearchUri,
                                            @collectorNumber,
                                            @digital,
                                            @rarity,
                                            @cardBackId,
                                            @artist,
                                            @illustrationId,
                                            @borderColor,
                                            @frame,
                                            @fullArt,
                                            @textless,
                                            @booster,
                                            @storySpotlight,
                                            @edhrecRank
                                            )";
                var parameters = new
                {
                    ScryId = scryCard.Id,
                    Name = scryCard.Name,
                    OracleId = scryCard.OracleId,
                    ReleasedAt = scryCard.ReleasedAt,
                    Uri = scryCard.Uri.ToString(),
                    ScryfallUri = scryCard.ScryfallUri.ToString(),
                    Layout = scryCard.Layout,
                    HighresImage = scryCard.HighresImage,
                    ManaCost = scryCard.ManaCost,
                    Cmc = scryCard.Cmc,
                    TypeLine = scryCard.TypeLine,
                    Reserved = scryCard.Reserved,
                    Foil = scryCard.Foil,
                    Nonfoil = scryCard.Nonfoil,
                    Oversized = scryCard.Oversized,
                    Promo = scryCard.Promo,
                    Reprint = scryCard.Reprint,
                    Variation = scryCard.Variation,
                    Set = scryCard.Set,
                    SetName = scryCard.SetName,
                    SetType = scryCard.SetType,
                    ScryfallSetUri = scryCard.ScryfallSetUri.ToString(),
                    RulingsUri = scryCard.RulingsUri.ToString(),
                    PrintsSearchUri = scryCard.PrintsSearchUri.ToString(),
                    CollectorNumber = scryCard.CollectorNumber,
                    Digital = scryCard.Digital,
                    Rarity = scryCard.Rarity,
                    CardBackId = scryCard.CardBackId,
                    Artist = scryCard.Artist,
                    IllustrationId = scryCard.IllustrationId,
                    BorderColor = scryCard.BorderColor,
                    Frame = scryCard.Frame,
                    FullArt = scryCard.FullArt,
                    Textless = scryCard.Textless,
                    Booster = scryCard.Booster,
                    StorySpotlight = scryCard.StorySpotlight,
                    EdhrecRank = scryCard.EdhrecRank,
                };
                
                return db.QueryFirst<UserCard>(sql, parameters);
            }
        }

        internal void LinkCardLists(Card scryCard, Guid userCardId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var multiverseIds = scryCard.MultiverseIds;
                if (multiverseIds != null)
                {
                    foreach (var multiverseId in multiverseIds)
                    {
                        var sql = @"INSERT INTO [MultiverseIds] (
                                                [CardId], [MultiverseId]
                                        ) VALUES (
                                                @cardId, @multiverseId
                                        )";
                        var parameters = new
                        {
                            CardId = userCardId,
                            MultiverseId = multiverseId
                        };
                        db.Execute(sql, parameters);
                    }
                }

                var colors = scryCard.Colors;
                if (colors != null)
                {
                    foreach (var color in colors)
                    {
                        var sql = @"INSERT INTO [Colors] (
                                                [CardId], [Color]
                                        ) VALUES (
                                                @cardId, @color
                                        )";
                        var parameters = new
                        {
                            CardId = userCardId,
                            Color = color
                        };
                        db.Execute(sql, parameters);
                    }
                }

                var colorIdentity = scryCard.ColorIdentity;
                if (colorIdentity != null)
                {
                    foreach (var colorId in colorIdentity)
                    {
                        var sql = @"INSERT INTO [ColorIdentity] (
                                                [CardId], [Color]
                                        ) VALUES (
                                                @cardId, @color
                                        )";
                        var parameters = new
                        {
                            CardId = userCardId,
                            Color = colorId
                        };
                        db.Execute(sql, parameters);
                    }
                }

                var games = scryCard.Games;
                if (games != null)
                {
                    foreach (var game in games)
                    {
                        var sql = @"INSERT INTO [Games] (
                                                [CardId], [Game]
                                        ) VALUES (
                                                @cardId, @game
                                        )";
                        var parameters = new
                        {
                            CardId = userCardId,
                            Game = game
                        };
                        db.Execute(sql, parameters);
                    }
                }

                var artistIds = scryCard.ArtistIds;
                if (artistIds != null)
                {
                    foreach (var artistId in artistIds)
                    {
                        var sql = @"INSERT INTO [ArtistIds] (
                                                [CardId], [ArtistId]
                                        ) VALUES (
                                                @cardId, @artistId
                                        )";
                        var parameters = new
                        {
                            CardId = userCardId,
                            ArtistId = artistId
                        };
                        db.Execute(sql, parameters);
                    }
                }

                var cardFaces = scryCard.CardFaces;
                if (cardFaces != null)
                {
                    foreach (var cardFace in cardFaces)
                    {
                        var sql = @"INSERT INTO [CardFace] (
                                                [CardId], [Object], [Name], [PrintedName], [ManaCost], 
                                                [TypeLine], [PrintedTypeLine], [OracleText], [PrintedText], [Artist], [ArtistId], [IllustrationId] 
                                         )  VALUES  (
                                                @cardId, @object, @name, @printedName, @manaCost,
                                                @typeLine, @printedTypeLine, @oracleText, @printedText, @artist, @artistId, @illustrationId 
                                        )";
                        var parameters = new
                        {
                            CardId = userCardId,
                            Object = cardFace.Object,
                            Name = cardFace.Name,
                            PrintedName = cardFace.PrintedName,
                            ManaCost = cardFace.ManaCost,
                            TypeLine = cardFace.TypeLine,
                            PrintedTypeLine = cardFace.PrintedTypeLine,
                            OracleText = cardFace.OracleText,
                            PrintedText = cardFace.PrintedText,
                            Artist = cardFace.Artist,
                            ArtistId = cardFace.ArtistId,
                            IllustrationId = cardFace.IllustrationId
                        };
                        db.Execute(sql, parameters);
                    }
                }


                var legalities = scryCard.Legalities;
                if (legalities != null)
                {
                    var legalitiesSql = @"INSERT INTO [Legalities] (
                                                            [CardId], [Standard], [Future], [Historic], [Pioneer], [Modern], [Legacy], 
                                                            [Pauper], [Vintage], [Penny], [Commander], [Brawl], [Duel], [Oldschool]
                                                    ) VALUES (
                                                        @cardId, @standard, @future, @historic, @pioneer, @modern, @legacy, 
                                                        @pauper, @vintage, @penny, @commander, @brawl, @duel, @oldschool
                                                    )";
                    var legalitiesParameters = new
                    {
                        CardId = userCardId,
                        Standard = legalities.Standard,
                        Future = legalities.Future,
                        Historic = legalities.Historic,
                        Pioneer = legalities.Pioneer,
                        Modern = legalities.Modern,
                        Legacy = legalities.Legacy,
                        Pauper = legalities.Pauper,
                        Vintage = legalities.Vintage,
                        Penny = legalities.Penny,
                        Commander = legalities.Commander,
                        Brawl = legalities.Brawl,
                        Duel = legalities.Duel,
                        Oldschool = legalities.Oldschool,
                    };
                    db.Execute(legalitiesSql, legalitiesParameters);
                }

                var prices = scryCard.Prices;
                if (prices != null)
                {
                    var pricesSql = @"INSERT INTO [Prices] (
                                                        [CardId], [Usd], [UsdFoil], [Eur], [Tix] 
                                                ) VALUES (
                                                         @cardId, @usd, @usdFoil, @eur, @tix
                                                )";
                    var pricesParameters = new
                    {
                        CardId = userCardId,
                        Usd = prices.Usd?.ToString(),
                        UsdFoil = prices.UsdFoil?.ToString(),
                        Eur = prices.Eur?.ToString(),
                        Tix = prices.Tix?.ToString()
                    };
                    db.Execute(pricesSql, pricesParameters);
                }

                var relatedUris = scryCard.RelatedUris;
                if (relatedUris != null)
                {
                    var relatedUrisSql = @"INSERT INTO [RelatedUris] (
                                                        [CardId], [Gatherer], [TcgplayerDecks], [Edhrec], [Mtgtop8]
                                                        ) VALUES (
                                                         @cardId, @gatherer, @tcgplayerDecks, @edhrec, @mtgtop8
                                                        )";
                    var relatedUrisParameters = new
                    {
                        CardId = userCardId,
                        Gatherer = relatedUris.Gatherer?.ToString(),
                        TcgplayerDecks = relatedUris.TcgplayerDecks?.ToString(),
                        Edhrec = relatedUris.Edhrec?.ToString(),
                        Mtgtop8 = relatedUris.Mtgtop8?.ToString()
                    };
                    db.Execute(relatedUrisSql, relatedUrisParameters);
                }

                var imageUris = scryCard.ImageUris;
                if (imageUris != null)
                {
                    var imageUrisSql = @"INSERT INTO [ImageUris] (
                                                        [CardId], [Small], [Normal], [Large], [Png], [ArtCrop], [BorderCrop]
                                                        ) VALUES (
                                                         @cardId, @small, @normal, @large, @png, @artCrop, @borderCrop
                                                        )";
                    var imageUriParameters = new
                    {
                        CardId = userCardId,
                        Small = imageUris.Small?.ToString(),
                        Normal = imageUris.Normal?.ToString(),
                        Large = imageUris.Large?.ToString(),
                        Png = imageUris.Png?.ToString(),
                        ArtCrop = imageUris.ArtCrop?.ToString(),
                        BorderCrop = imageUris.BorderCrop?.ToString()
                    };
                    db.Execute(imageUrisSql, imageUriParameters);
                }

                var purchaseUris = scryCard.PurchaseUris;
                if (purchaseUris != null)
                {
                    var purchaseUrisSql = @"INSERT INTO [PurchaseUris] (
                                                        [CardId], [Tcgplayer], [Cardmarket], [Cardhoarder]
                                                        ) VALUES (
                                                         @cardId, @tcgplayer, @cardmarket, @cardhoarder
                                                        )";
                    var puchaseUriParameters = new
                    {
                        CardId = userCardId,
                        Tcgplayer = purchaseUris.Tcgplayer?.ToString(),
                        Cardmarket = purchaseUris.Cardmarket?.ToString(),
                        Cardhoarder = purchaseUris.Cardhoarder?.ToString()
                    };

                    db.Execute(purchaseUrisSql, puchaseUriParameters);
                }
            }
        }
    }
}
