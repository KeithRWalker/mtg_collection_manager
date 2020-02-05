import React from 'react';
import {
  Button,
  Card,
  CardImg,
  Col,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  CardFooter
} from 'reactstrap';
import { Link } from 'react-router-dom';
import AddButton from './AddButton';

import './CardSingle.scss';



class CardSingle extends React.Component {
    render() {
      const { magicCard } = this.props;
      const { userDecks, userBinders } = this.props;
      const {
        artist,
        id,
        image_uris,
        name,
        rarity,
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

      const addToDeck = <AddButton collection={userDecks} type="Deck" scryId={id} />
      const addToBinder = <AddButton collection={userBinders} type="Binder" scryId={id}/>
      
      return(
              <Col className="CardSingle" xs="1" sm="2" md="2">
              <Card body>
                <CardBody className="card-header">
                  <CardTitle><Link to={`/card/${id}`}>{name}</Link></CardTitle>
                  <CardSubtitle>Artist: {artist}</CardSubtitle>
                </CardBody>
              <img className={`${cardColor} magic-card-image`} width="100%" src={images[1]} alt="Card image cap" />
                  <CardBody className="card-footer">
                      <CardText className={rarity}>{rarity}</CardText>
                  </CardBody>
                  <CardFooter>
                    {addToDeck}
                    {addToBinder}
                  </CardFooter>
              </Card>
              </Col>
      );
    }
}

export default CardSingle;
