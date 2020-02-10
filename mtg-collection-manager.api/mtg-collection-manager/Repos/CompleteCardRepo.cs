using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using mtg_collection_manager.Models;
using Remotion.Linq.Clauses;

namespace mtg_collection_manager.Repos
{
    public class CompleteCardRepo
    {
        string _connectionString = @"Server=localhost;
                                                            Database=MTG;
                                                                Trusted_Connection=True;";

        public CompleteCard CreateCompleteCardFromUserCard(UserCard userCard)
        {
            var cardId = userCard.Id;
            var completeCard = new CompleteCard
            {
                Id = userCard.Id,
                ScryId = userCard.ScryId,
                OracleId = userCard.OracleId,
                Name = userCard.Name,
                Lang = userCard.Lang,
                ReleasedAt = userCard.ReleasedAt,
                Uri = userCard.Uri,
                ScryfallUri = userCard.ScryfallUri,
                Layout = userCard.Layout,
                HighresImage = userCard.HighresImage,
                ManaCost = userCard.ManaCost,
                Cmc = userCard.Cmc,
                TypeLine = userCard.TypeLine,
                Reserved = userCard.Reserved,
                Foil = userCard.Foil,
                Nonfoil = userCard.Nonfoil,
                Oversized = userCard.Oversized,
                Promo = userCard.Promo,
                Reprint = userCard.Reprint,
                Variation = userCard.Variation,
                Set = userCard.Set,
                SetName = userCard.SetName,
                SetType = userCard.SetType,
                SetUri = userCard.ScryfallSetUri,
                SetSearchUri = userCard.SetSearchUri,
                ScryfallSetUri = userCard.ScryfallSetUri,
                RulingsUri = userCard.RulingsUri,
                PrintsSearchUri = userCard.PrintsSearchUri,
                CollectorNumber = userCard.CollectorNumber,
                Digital = userCard.Digital,
                Rarity = userCard.Rarity,
                CardBackId = userCard.CardBackId,
                Artist = userCard.Artist,
                IllustrationId = userCard.IllustrationId,
                BorderColor = userCard.BorderColor,
                Frame = userCard.Frame,
                FullArt = userCard.FullArt,
                Textless = userCard.Textless,
                Booster = userCard.Booster,
                StorySpotlight = userCard.StorySpotlight,
                EdhrecRank = userCard.EdhrecRank
            };

            using (var db = new SqlConnection(_connectionString))
            {
                var parameters = new { CardId = cardId };

                var multiverseIdSql = @"SELECT [MultiverseId] FROM [MultiverseIds] WHERE [CardId] = @cardId";
                var multiverseIds = db.Query<long>(multiverseIdSql, parameters);
                completeCard.MultiverseIds = multiverseIds?.AsList();

                var colorsSql = @"SELECT [Color] FROM [Colors] WHERE [CardId] = @cardId";
                var colors = db.Query<string>(colorsSql, parameters);
                completeCard.Colors = colors?.AsList();

                var colorIdentitySql = @"SELECT [Color] FROM [ColorIdentity] WHERE [CardId] = @cardId";
                var colorIdentity = db.Query<string>(colorIdentitySql, parameters);
                completeCard.ColorIdentity = colorIdentity?.AsList();

                var gamesSql = @"SELECT [Game] FROM [Games] WHERE [CardId] = @cardId";
                var games = db.Query<string>(gamesSql, parameters);
                completeCard.Games = games?.AsList();

                var artistIdsSql = @"SELECT [ArtistId] FROM [ArtistIds] WHERE [CardId] = @cardId";
                var artistIds = db.Query<Guid>(artistIdsSql, parameters);
                completeCard.ArtistIds = artistIds?.AsList();

                var cardFaceSql = @"SELECT * FROM [CardFace] WHERE [CardId] = @cardId";
                var cardFaces = db.Query<CompleteCardFace>(cardFaceSql, parameters);
                completeCard.CardFaces = cardFaces?.AsList(); 

                var legalitiesSql = @"SELECT * FROM [Legalities] WHERE [CardId] = @cardId";
                var legalities = db.QueryFirstOrDefault<CompleteCardLegalities>(legalitiesSql, parameters);
                completeCard.Legalities = legalities;

                var pricesSql = @"SELECT * FROM [Prices] WHERE [CardId] = @cardId";
                var prices = db.QueryFirstOrDefault<CompleteCardPrices>(pricesSql, parameters);
                completeCard.Prices = prices;

                var relatedUrisSql = @"SELECT * FROM [RelatedUris] WHERE [CardId] = @cardId";
                var relatedUris = db.QueryFirstOrDefault<CompleteCardRelatedUris>(relatedUrisSql, parameters);
                completeCard.RelatedUris = relatedUris;

                var imageUrisSql = @"SELECT * FROM [ImageUris] WHERE [CardId] = @cardId";
                var imageUris = db.QueryFirstOrDefault<CompleteCardImageUris>(imageUrisSql, parameters);
                completeCard.ImageUris = imageUris;

                var purchaseUrisSql = @"SELECT * FROM [PurchaseUris] WHERE [CardId] = @cardId";
                var purchaseUris = db.QueryFirstOrDefault<CompleteCardPurchaseUris>(purchaseUrisSql, parameters);
                completeCard.PurchaseUris = purchaseUris;
            }

            return completeCard;
        }
    }
}
