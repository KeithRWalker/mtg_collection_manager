USE master
GO
-- Reset Database
-----------------------------------------------------------------------

-- If DB exists Delete DB --
IF EXISTS (
    SELECT [name]
    FROM sys.databases
    WHERE [name] = N'MTG'
)
ALTER DATABASE [MTG] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
USE master
DROP DATABASE [MTG]
GO
-----------------------------------------------------------------------

-- If DB doesn't Exist Create DB --
IF NOT EXISTS (
SELECT [name]
FROM sys.databases
WHERE [name] = N'MTG'
)
CREATE DATABASE MTG
GO
-----------------------------------------------------------------------

-- CREATE USER TABLE --

USE MTG
IF OBJECT_ID('[dbo].[User]', 'U') IS NOT NULL
DROP TABLE [dbo].[User]
GO

CREATE TABLE [dbo].[User] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [FirebaseUid] NVARCHAR(255),
  [UserName] NVARCHAR(255),
  [Email] NVARCHAR(255),
  [City] NVARCHAR(255),
  [State] NVARCHAR(255),
  [FirstName] NVARCHAR(255),
  [LastName] NVARCHAR(255)
)
GO
-----------------------------------------------------------------------

-- CREATE BINDER TABLE --

USE MTG
IF OBJECT_ID('[dbo].[Binder]', 'U') IS NOT NULL
DROP TABLE [dbo].[Binder]
GO

CREATE TABLE [dbo].[Binder] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [UserId] UNIQUEIDENTIFIER
    FOREIGN KEY (UserId)
    REFERENCES [User] (Id),
  [Name] NVARCHAR(255),
  [Type] NVARCHAR(255),
  [Description] NVARCHAR(255),
  [Tags] NVARCHAR(255),
  [TotalValue] INT
)
GO
-----------------------------------------------------------------------

-- CREATE DECK TABLE --

USE MTG
IF OBJECT_ID('[dbo].[Deck]', 'U') IS NOT NULL
DROP TABLE [dbo].[Deck]
GO

CREATE TABLE [dbo].[Deck] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [UserId] UNIQUEIDENTIFIER
    FOREIGN KEY (UserId)
    REFERENCES [User] (Id),
  [Name] NVARCHAR(255),
  [Description] NVARCHAR(255),
  [Type] NVARCHAR(255),
  [Rating] INT
)
GO
-----------------------------------------------------------------------

-- CREATE CARD TABLE --

USE MTG
IF OBJECT_ID('[dbo].[Card]', 'U') IS NOT NULL
DROP TABLE [dbo].[Card]
GO

CREATE TABLE [dbo].[Card] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [ScryId] UNIQUEIDENTIFIER,
  [Name] NVARCHAR(255),
  [OracleId] UNIQUEIDENTIFIER,
  [OracleText] NVARCHAR(500),
  [Power] NVARCHAR(255),
  [Loyalty] NVARCHAR(500),
  [Toughness] NVARCHAR(255),
  [Lang] NVARCHAR(255),
  [ReleasedAt] DateTimeOffset,
  [Uri] NVARCHAR(500),
  [ScryfallUri] NVARCHAR(500),
  [Layout] NVARCHAR(255),
  [HighresImage] BIT,
  [ManaCost] NVARCHAR(255),
  [Cmc] INT,
  [TypeLine] NVARCHAR(500),
  [Reserved] BIT,
  [Foil] BIT,
  [Nonfoil] BIT,
  [Oversized] BIT,
  [Promo] BIT,
  [Reprint] BIT,
  [Variation] BIT,
  [Set] NVARCHAR(255),
  [SetName] NVARCHAR(255),
  [SetType] NVARCHAR(255),
  [ScryfallSetUri] NVARCHAR(500),
  [RulingsUri] NVARCHAR(500),
  [PrintsSearchUri] NVARCHAR(500),
  [CollectorNumber] INT,
  [Digital] BIT,
  [Rarity] NVARCHAR(255),
  [CardBackId] UNIQUEIDENTIFIER,
  [Artist] NVARCHAR(255),
  [IllustrationId] UNIQUEIDENTIFIER,
  [BorderColor] NVARCHAR(255),
  [Frame] INT,
  [FullArt] BIT,
  [Textless] BIT,
  [Booster] BIT,
  [StorySpotlight] BIT,
  [EdhrecRank] BIT,
)
GO

USE MTG
IF OBJECT_ID('[dbo].[CardFace]', 'U') IS NOT NULL
DROP TABLE [dbo].[CardFace]
GO
CREATE TABLE [dbo].[CardFace] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [CardId] UNIQUEIDENTIFIER
    FOREIGN KEY (CardId)
    REFERENCES [Card] (Id),
  [Object] NVARCHAR(255),
  [Name] NVARCHAR(255),
  [PrintedName] NVARCHAR(255),
  [ManaCost] NVARCHAR(255),
  [Loyalty] NVARCHAR(255),
  [Power] NVARCHAR(255),
  [FlavorText] NVARCHAR (255),
  [TypeLine] NVARCHAR(255),
  [PrintedTypeLine] NVARCHAR(255),
  [OracleText] NVARCHAR(500),
  [PrintedText] NVARCHAR(255),
  [Artist] NVARCHAR(255),
  [ArtistId] UNIQUEIDENTIFIER,
  [IllustrationId] UNIQUEIDENTIFIER,
)

USE MTG
IF OBJECT_ID('[dbo].[CardFaceImageUris]', 'U') IS NOT NULL
DROP TABLE [dbo].[CardFaceImageUris]
GO
CREATE TABLE [dbo].[CardFaceImageUris] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [CardFaceId] UNIQUEIDENTIFIER
    FOREIGN KEY (CardFaceId)
    REFERENCES [CardFace] (Id),
  [Small] NVARCHAR(500),
  [Normal] NVARCHAR(500),
  [Large] NVARCHAR(500),
  [Png] NVARCHAR(500),
  [ArtCrop] NVARCHAR(500),
  [BorderCrop] NVARCHAR(500)
)

USE MTG
IF OBJECT_ID('[dbo].[ImageUris]', 'U') IS NOT NULL
DROP TABLE [dbo].[ImageUris]
GO
CREATE TABLE [dbo].[ImageUris] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [CardId] UNIQUEIDENTIFIER
    FOREIGN KEY (CardId)
    REFERENCES [Card] (Id),
  [Small] NVARCHAR(500),
  [Normal] NVARCHAR(500),
  [Large] NVARCHAR(500),
  [Png] NVARCHAR(500),
  [ArtCrop] NVARCHAR(500),
  [BorderCrop] NVARCHAR(500)
)

USE MTG
IF OBJECT_ID('[dbo].[Legalities]', 'U') IS NOT NULL
DROP TABLE [dbo].[Legalities]
GO
CREATE TABLE [dbo].[Legalities] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [CardId] UNIQUEIDENTIFIER
    FOREIGN KEY (CardId)
    REFERENCES [Card] (Id),
  [Standard] NVARCHAR(15),
  [Future] NVARCHAR(15),
  [Historic] NVARCHAR(15),
  [Pioneer] NVARCHAR(15),
  [Modern] NVARCHAR(15),
  [Legacy] NVARCHAR(15),
  [Pauper] NVARCHAR(15),
  [Vintage] NVARCHAR(15),
  [Penny] NVARCHAR(15),
  [Commander] NVARCHAR(15),
  [Brawl] NVARCHAR(15),
  [Duel] NVARCHAR(15),
  [Oldschool] NVARCHAR(15)
)

USE MTG
IF OBJECT_ID('[dbo].[Prices]', 'U') IS NOT NULL
DROP TABLE [dbo].[Prices]
GO
CREATE TABLE [dbo].[Prices] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [CardId] UNIQUEIDENTIFIER
    FOREIGN KEY (CardId)
    REFERENCES [Card] (Id),
  [Usd] NVARCHAR(50),
  [UsdFoil] NVARCHAR(50),
  [Eur] NVARCHAR(50),
  [Tix] NVARCHAR(50)
)

USE MTG
IF OBJECT_ID('[dbo].[PurchaseUris]', 'U') IS NOT NULL
DROP TABLE [dbo].[PurchaseUris]
GO
CREATE TABLE [dbo].[PurchaseUris] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [CardId] UNIQUEIDENTIFIER
    FOREIGN KEY (CardId)
    REFERENCES [Card] (Id),
  [Tcgplayer] NVARCHAR(500),
  [Cardmarket] NVARCHAR(500),
  [Cardhoarder] NVARCHAR(500)
)

USE MTG
IF OBJECT_ID('[dbo].[RelatedUris]', 'U') IS NOT NULL
DROP TABLE [dbo].[RelatedUris]
GO
CREATE TABLE [dbo].[RelatedUris] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [CardId] UNIQUEIDENTIFIER
    FOREIGN KEY (CardId)
    REFERENCES [Card] (Id),
    [Gatherer] NVARCHAR(500),
  [TcgplayerDecks] NVARCHAR(500),
  [Edhrec] NVARCHAR(500),
  [Mtgtop8] NVARCHAR(500)
)

USE MTG
IF OBJECT_ID('[dbo].[Colors]', 'U') IS NOT NULL
DROP TABLE [dbo].[Colors]
GO
CREATE TABLE [dbo].[Colors] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [CardId] UNIQUEIDENTIFIER
    FOREIGN KEY (CardId)
    REFERENCES [Card] (Id),
  [Color] NVARCHAR(10),
)

USE MTG
IF OBJECT_ID('[dbo].[ColorIdentity]', 'U') IS NOT NULL
DROP TABLE [dbo].[ColorIdentity]
GO
CREATE TABLE [dbo].[ColorIdentity] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [CardId] UNIQUEIDENTIFIER
    FOREIGN KEY (CardId)
    REFERENCES [Card] (Id),
  [Color] NVARCHAR(255),
)

USE MTG
IF OBJECT_ID('[dbo].[Games]', 'U') IS NOT NULL
DROP TABLE [dbo].[Games]
GO
CREATE TABLE [dbo].[Games] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [CardId] UNIQUEIDENTIFIER
    FOREIGN KEY (CardId)
    REFERENCES [Card] (Id),
  [Game] NVARCHAR(50),
)

USE MTG
IF OBJECT_ID('[dbo].[MultiverseIds]', 'U') IS NOT NULL
DROP TABLE [dbo].[MultiverseIds]
GO
CREATE TABLE [dbo].[MultiverseIds] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [CardId] UNIQUEIDENTIFIER
    FOREIGN KEY (CardId)
    REFERENCES [Card] (Id),
  [MultiverseId] INT,
)

USE MTG
IF OBJECT_ID('[dbo].[ArtistIds]', 'U') IS NOT NULL
DROP TABLE [dbo].[ArtistIds]
GO
CREATE TABLE [dbo].[ArtistIds] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [CardId] UNIQUEIDENTIFIER
    FOREIGN KEY (CardId)
    REFERENCES [Card] (Id),
  [ArtistId] UNIQUEIDENTIFIER,
)
-----------------------------------------------------------------------

-- CREATE SLEEVE TABLE --

USE MTG
IF OBJECT_ID('[dbo].[BinderSleeve]', 'U') IS NOT NULL
DROP TABLE [dbo].[BinderSleeve]
GO

CREATE TABLE [dbo].[BinderSleeve] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [CardId] UNIQUEIDENTIFIER
    FOREIGN KEY (CardId)
    REFERENCES [Card] (Id),
  [BinderId] UNIQUEIDENTIFIER
    FOREIGN KEY (BinderId)
    REFERENCES [Binder] (Id),
  [Quantity] INT
)
GO
-----------------------------------------------------------------------
-- CREATE DECKSLEEVE TABLE --

USE MTG
IF OBJECT_ID('[dbo].[DeckSleeve]', 'U') IS NOT NULL
DROP TABLE [dbo].[DeckSleeve]
GO

CREATE TABLE [dbo].[DeckSleeve] (
  [Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
  [DeckId] UNIQUEIDENTIFIER
    FOREIGN KEY (DeckId)
    REFERENCES [Deck] (Id),
  [CardId] UNIQUEIDENTIFIER
    FOREIGN KEY (CardId)
    REFERENCES [Card] (Id),
  [Quantity] INT
)
GO
-----------------------------------------------------------------------