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

        public Symbol GetAllSymbols()
        {
            var requestPath = $"/symbology";

            var request = new RestRequest(requestPath, DataFormat.Json);

            var jsonString = _client.Get(request).Content;

            var symbolData = Symbol.FromJson(jsonString);

            return symbolData;
        }
        
        public List<SymbolValues> GetSimpleSymbols()
        {
            var requestPath = $"/symbology";

            var request = new RestRequest(requestPath, DataFormat.Json);

            var jsonString = _client.Get(request).Content;

            var symbolData = Symbol.FromJson(jsonString);

            var symbolValues = symbolData.SymbolValues;

            var newSymbolList = new List<SymbolValues>();

            foreach (var currentSymbol in symbolValues)
            {
                var newSymbol = new SymbolValues();
                newSymbol.Symbol = currentSymbol.Symbol;
                newSymbol.SvgUri = currentSymbol.SvgUri;
                newSymbol.RepresentsMana = currentSymbol.RepresentsMana;
                newSymbol.Colors = currentSymbol.Colors;
                newSymbolList.Add(newSymbol);
            }

            return newSymbolList;
        }
    }
}
