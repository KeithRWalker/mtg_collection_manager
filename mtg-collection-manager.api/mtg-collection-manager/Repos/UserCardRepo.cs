using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using mtg_collection_manager.Models;

namespace mtg_collection_manager.Repos
{
    public class UserCardRepo
    {
        string _connectionString = @"Server=localhost;
                                                            Database=MTG;
                                                                Trusted_Connection=True;";
        public UserCard GetUserCardByUserCardId(Guid cardId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT * FROM [Card] WHERE [Id] = @cardId";
                var parameters = new { CardId = cardId };
                return db.QueryFirst<UserCard>(sql, parameters);
            }
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
                                            [OracleText],
                                            [Power],
                                            [Loyalty],
                                            [Toughness],
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
                                            @oracleText,
                                            @power,
                                            @loyalty,
                                            @toughness,
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
                    OracleText = scryCard.OracleText,
                    Power = scryCard.Power,
                    Loyalty = scryCard.Loyalty?.ToString(),
                    Toughness = scryCard.Toughness,
                    ReleasedAt = scryCard.ReleasedAt,
                    Uri = scryCard.Uri?.ToString(),
                    ScryfallUri = scryCard?.ScryfallUri.ToString(),
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
                    ScryfallSetUri = scryCard.ScryfallSetUri?.ToString(),
                    RulingsUri = scryCard.RulingsUri?.ToString(),
                    PrintsSearchUri = scryCard.PrintsSearchUri?.ToString(),
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
                                                [CardId], [Object], [Name], [PrintedName], [ManaCost], [Loyalty], [Power], [FlavorText],
                                                [TypeLine], [PrintedTypeLine], [OracleText], [PrintedText], [Artist], [ArtistId], [IllustrationId]
                                         )
                                            VALUES  (
                                                @cardId, @object, @name, @printedName, @manaCost, @loyalty, @power, @flavorText,
                                                @typeLine, @printedTypeLine, @oracleText, @printedText, @artist, @artistId, @illustrationId 
                                        )";
                        var parameters = new
                        {
                            CardId = userCardId,
                            Object = cardFace.Object,
                            Name = cardFace.Name,
                            PrintedName = cardFace.PrintedName,
                            ManaCost = cardFace.ManaCost,
                            Loyalty = cardFace.Loyalty,
                            Power = cardFace.Power,
                            FlavorText = cardFace.FlavorText,
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

                
                if (cardFaces != null)
                {
                        var sql = @"SELECT * FROM [CardFace] WHERE [CardId] = @cardId";
                        var dbCardFaces = db.Query<CompleteCardFace>(sql, new { CardId = userCardId })?.AsList();
                        if (dbCardFaces != null)
                        {
                            var i = 0;
                            foreach (var cardFace in dbCardFaces)
                            {
                                if (cardFace != null)
                                {
                                    if (scryCard.CardFaces[i] != null)
                                    {
                                        CardFaceImageUris CFImages = scryCard.CardFaces[i].CardFaceImageUris;

                                        //CardFaceImageUris CFImages = new CardFaceImageUris();
                                        // CFImages = cardFaceImageUris;
                                        if (CFImages != null)
                                        {
                                            var cardFaceImageUriSql = @"INSERT INTO [CardFaceImageUris] (
                                                                    [CardFaceId], [Small], [Normal], [Large], [Png], [ArtCrop], [BorderCrop]
                                                            ) VALUES (
                                                                    @cardFaceId, @small, @normal, @large, @png, @artCrop, @borderCrop
                                                            )";
                                            var cardFaceParams = new
                                            {
                                                CardFaceId = cardFace.Id,
                                                Small = CFImages.Small?.ToString(),
                                                Normal = CFImages.Normal?.ToString(),
                                                Large = CFImages.Large?.ToString(),
                                                Png = CFImages.Png?.ToString(),
                                                ArtCrop = CFImages.ArtCrop?.ToString(),
                                                BorderCrop = CFImages.BorderCrop?.ToString()
                                            };
                                            db.Execute(cardFaceImageUriSql, cardFaceParams);
                                            i++;
                                        }
                                    }
                                }
                            }
                        }
                }



                Legalities legalities = scryCard.Legalities;
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

                Prices prices = scryCard.Prices;
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

                RelatedUris relatedUris = scryCard.RelatedUris;
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

                ImageUris imageUris = scryCard.ImageUris;
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

                PurchaseUris purchaseUris = scryCard.PurchaseUris;
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
