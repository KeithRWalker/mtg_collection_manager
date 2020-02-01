using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mtg_collection_manager.Models;
using RestSharp;

namespace mtg_collection_manager.Repos
{
    public class SymbolRepo
    {
        public readonly RestClient _client = new RestClient("https://api.scryfall.com");

        public SymbolContainer GetAllSymbols()
        {
            var requestPath = $"/symbology";

            var request = new RestRequest(requestPath, DataFormat.Json);

            var jsonString = _client.Get(request).Content;

            var symbolData = SymbolContainer.FromJson(jsonString);

            return symbolData;
        }

        public List<SimpleSymbol> GetSimpleSymbols()
        {
            var requestPath = $"/symbology";

            var request = new RestRequest(requestPath, DataFormat.Json);

            var jsonString = _client.Get(request).Content;

            var symbolData = SymbolContainer.FromJson(jsonString);

            var symbols = symbolData.Symbols;

            var simpleSymbols = new List<SimpleSymbol>();

            foreach (var symbol in symbols)
            {
                var simpleSymbol = new SimpleSymbol
                {
                    SymbolCode = symbol.SymbolCode,
                    SymbolText = symbol.SymbolText,
                    ImgUri = symbol.SvgUri,
                    SymbolColors = symbol.Colors
                };
                simpleSymbols.Add(simpleSymbol);
            }

            return simpleSymbols;
        }



        public List<SimpleSymbol> GetBasicMana()
        {
            var requestPath = $"/symbology";

            var request = new RestRequest(requestPath, DataFormat.Json);

            var jsonString = _client.Get(request).Content;

            var symbolData = SymbolContainer.FromJson(jsonString);

            var symbols = symbolData.Symbols;

            var simpleSymbols = new List<SimpleSymbol>();

            foreach (var symbol in symbols)
            {
                if (symbol.AppearsInManaCosts && symbol.Colors.Count == 1 && symbol.SymbolCode.Length == 3 || symbol.SymbolCode == "{C}")
                {
                    var simpleSymbol = new SimpleSymbol
                    {
                        SymbolCode = symbol.SymbolCode,
                        SymbolText = symbol.SymbolText,
                        ImgUri = symbol.SvgUri
                    };
                    simpleSymbols.Add(simpleSymbol);
                }

            }

            return simpleSymbols;
        }

        public List<SimpleSymbol> GetDoubleMana()
        {
            var requestPath = $"/symbology";

            var request = new RestRequest(requestPath, DataFormat.Json);

            var jsonString = _client.Get(request).Content;

            var symbolData = SymbolContainer.FromJson(jsonString);

            var symbols = symbolData.Symbols;

            var simpleSymbols = new List<SimpleSymbol>();

            foreach (var symbol in symbols)
            {
                if (symbol.AppearsInManaCosts && symbol.Colors.Count != 2)
                {
                    var simpleSymbol = new SimpleSymbol
                    {
                        SymbolCode = symbol.SymbolCode,
                        SymbolText = symbol.SymbolText,
                        ImgUri = symbol.SvgUri,
                        SymbolColors = symbol.Colors
                    };
                    simpleSymbols.Add(simpleSymbol);
                }
            }

            return simpleSymbols;
        }
    }
}
