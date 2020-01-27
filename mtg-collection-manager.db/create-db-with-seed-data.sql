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
  [DeckType] NVARCHAR(255),
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
  [ScryId] NVARCHAR(36),
  [Name] NVARCHAR(255)
)
GO
-----------------------------------------------------------------------

-- CREATE SLEEVE TABLE --

USE MTG
IF OBJECT_ID('[dbo].[Sleeve]', 'U') IS NOT NULL
DROP TABLE [dbo].[Sleeve]
GO

CREATE TABLE [dbo].[Sleeve] (
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
INSERT INTO [dbo].[User]
(
    [Id], [FirebaseUid], [Username], [Email], [City], [State], [FirstName], [LastName]
)
VALUES
(
    DEFAULT,
    '0000000000000000',
    'GuttacatTest',
    'KRW418Test@gmail.com',
    'Clarksville',
    'TN',
    'Keith',
    'Walker'
)
--------------------------------------------------------------------------
INSERT INTO [dbo].[Binder]
([Id], [UserId], [Name], [Type], [Description], [Tags], [TotalValue])
VALUES
(
    DEFAULT,
    (select [Id] from [dbo].[User] WHERE [User].[FirstName] = 'Keith'),
    'Keiths Binder',
    'Test',
    'This is a test Binder',
    '#TEST',
    1000
)
--------------------------------------------------------------------------------
INSERT INTO [dbo].[Deck]
([Id], [UserId], [Name], [Description], [DeckType], [Rating])
VALUES
(
    DEFAULT,
    (select [Id] from [dbo].[User] WHERE [User].[FirstName] = 'Keith'),
    'Keiths Deck',
    'This is a test Binder',
    'TEST DECK',
    100
)
INSERT INTO [dbo].[Card]
([Id], [ScryId], [Name])
VALUES
(DEFAULT, 'TestScryId', 'Test Card 1'),
(DEFAULT, 'TestScryId', 'Test Card 2'),
(DEFAULT, 'TestScryId', 'Test Card 3')
--------------------------------------------------------------------------------
INSERT INTO [dbo].[Sleeve]
([Id], [CardId], [BinderId], [Quantity])
VALUES
(
    DEFAULT,
    (SELECT [Id] FROM [Card] WHERE [Card].[Name] = 'Test Card 1'),
    (SELECT [Id] FROM [Binder] WHERE [Binder].Name = 'Keiths Binder'),
    1
),
(
    DEFAULT,
    (SELECT [Id] FROM [Card] WHERE [Card].[Name] = 'Test Card 2'),
    (SELECT [Id] FROM [Binder] WHERE [Binder].Name = 'Keiths Binder'),
    1
),
(
    DEFAULT,
    (SELECT [Id] FROM [Card] WHERE [Card].[Name] = 'Test Card 3'),
    (SELECT [Id] FROM [Binder] WHERE [Binder].Name = 'Keiths Binder'),
    1
)
--------------------------------------------------------------------------------
INSERT INTO [dbo].[DeckSleeve]
([Id], [CardId], [DeckId], [Quantity])
VALUES
(
    DEFAULT,
    (SELECT [Id] FROM [Card] WHERE [Card].[Name] = 'Test Card 1'),
    (SELECT [Id] FROM [Deck] WHERE [Deck].Name = 'Keiths Deck'),
    4
),
(
    DEFAULT,
    (SELECT [Id] FROM [Card] WHERE [Card].[Name] = 'Test Card 2'),
    (SELECT [Id] FROM [Deck] WHERE [Deck].Name = 'Keiths Deck'),
    4
),
(
    DEFAULT,
    (SELECT [Id] FROM [Card] WHERE [Card].[Name] = 'Test Card 3'),
    (SELECT [Id] FROM [Deck] WHERE [Deck].Name = 'Keiths Deck'),
    4
)