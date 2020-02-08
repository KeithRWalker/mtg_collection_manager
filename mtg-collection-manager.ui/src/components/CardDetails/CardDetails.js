import React from 'react';
import cardData from '../../data/cardData';

class CardDetails extends React.Component {

  state = {

  }

  componentDidMount(){
    const { cardId } = this.props.match.params;
    cardData.getCardDetails(cardId)
      .then((resp) => {
        const cardObj = resp;
        for(let[key, value] of Object.entries(cardObj)){
          if(value === null){
            console.log(key, + ' === null');
          }
          this.setState({ [key]: value })
        }
      }).catch(err => console.error("error in CardDetails/componentDidMount()"))
  }
    render() {
      const {
        // artist,
        // booster,
        // border_color,
        // cardback_id,
        // cmc,
        // collector_number,
        // digital,
        // edhrec_rank,
        // foil,
        // frame,
        // full_art,
        // highres_image,
        // id,
        // illustration_id,
        // image_uris,
        // lang,
        // layout,
        // legalities,
        // legality,
        // loyalty,
        // mana_cost,
        name,
        // non_foil,
        // object,
        // oracle_id,
        // oracle_text,
        // oversized,
        // prints_search_uri,
        // promo,
        // rarity,
        // release_date,
        // reprint,
        // reserved,
        // rulings_uri,
        // scryfall_set_uri,
        // scryfall_uri,
        // set,
        // set_name,
        // set_search_uri,
        // set_type,
        // set_uri,
        // story_spotlight,
        // tcg_player_id,
        // textless,
        // type_line,
        // uri,
        // variation
      } = this.state;
      //const { prices, related_uris, purchase_uris } = magicCard
      //const { edhrec, gatherer, mtgtop8, tcgplayer_decks } = related_uris;
      //const { cardhoarder, cardmarket, tcgplayer } = purchase_uris;
      //const { eur,tix,usd,usd_foil } = prices

          //const games[]
    //["arena", "mtgo", "paper"]
    //const artist_ids[]
    //["0", "1", "2", "3"]

    //const colors[]
    //["W","U","B","R","G"]
    //const color_identity[]
    //["W","U","B","R","G"]
    //const multiverse_ids[]
    //[0, 1, 2, 3, 4]



        return(
            <div className="CardDetails">
              <h1>{name}</h1>
            </div>
        );
    }
}

export default CardDetails;

/*
            <h1>Prices</h1>
            <ul>
              <li>EUR: {eur}</li>
              <li>TIX: {tix}</li>
              <li>USD: {usd}</li>
              <li>USD FOIL: {usd_foil}</li>
            </ul>
*/