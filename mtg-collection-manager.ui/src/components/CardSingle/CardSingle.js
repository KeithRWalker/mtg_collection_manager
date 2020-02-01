import React from 'react';
import {
    Card,
    CardImg,
    Col,
    CardTitle,
    CardText,
    CardSubtitle,
    CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom';

import './CardSingle.scss';
class CardSingle extends React.Component {
    render() {
      const { magicCard } = this.props;
      const {
        artist,
        // booster,
        // border_color,
        // cardback_id,
        // cmc,
        // collector_number,
        // digital,
        // edhrec_rank,
        // foil,
        // frame,
        // highres_image,
        id,
        //illustration_id,
        image_uris,
        // lang,
        // layout,
        // legalities,
        // legality,
        // loyalty,
        // mana_cost,
        name,
        // non_foil,
        // object,
        // oracle_text,
        // oversized,
        // prints_search_uri,
        // promo,
        rarity,
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
        // variation,
        // full_art,oracle_id
      } = magicCard;

      const { prices, related_uris, purchase_uris } = magicCard
      // const { eur,tix,usd,usd_foil } = prices
      // const { edhrec, gatherer, mtgtop8, tcgplayer_decks } = related_uris;
      // const { cardhoarder, cardmarket, tcgplayer } = purchase_uris;


      let cardColor = '';
      let images;

      if (image_uris=== null || image_uris === undefined){
        images = ["", "https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/f/f8/Magic_card_back.jpg"];
      } else {
        images = Object.values(image_uris)
      }
      const colorId = Object.values(magicCard.color_identity)
      if(colorId.length > 0){
        colorId.forEach(color => {
          cardColor += `${color}`
        });
      } else if(colorId.length === 0){
        cardColor = `${colorId[0]}`
      }

      return(
              <Col className="CardSingle" xs="1" sm="2" md="2">
              <Card body>
                <CardBody className="card-header">
                  <CardTitle><h4><Link to={`/card/${id}`}>{name}</Link></h4></CardTitle>
                  <CardSubtitle>Artist: {artist}</CardSubtitle>
                </CardBody>
              <img className={`${cardColor} magic-card-image`} width="100%" src={images[1]} alt="Card image cap" />
                  <CardBody className="card-footer">
                      <CardText className={rarity}>{rarity}</CardText>
                  </CardBody>
              </Card>
              </Col>
      );
    }
}

export default CardSingle;






    //prices{
    // eur
    // tix
    // usd
    // usd_foil
    //}


    //relatedUris{
    // edhrec
    // gatherer
    // mtgtop8
    // tcgplayer_decks
    //}

    //purchase_uris{
    // cardhoarder
    // cardmarket
    // tcgplayer
    //}

    //const games[]
    //["arena", "mtgo", "paper"]

    //const artist_ids[]
    //["0", "1", "2", "3"]

    //const Colors[]
    //["W","U","B","R","G"]

    //const ColorIdentity[]
    //["W","U","B","R","G"]

    //const MultiverseIds[]
    //[0, 1, 2, 3, 4]



