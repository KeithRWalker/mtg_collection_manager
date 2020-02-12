import React from 'react';
import {
  Card,
  CardImg,
  CardHeader,
  Col,
  CardTitle,
} from 'reactstrap';
import { MDBCardImage } from "mdbreact";
import { Link } from 'react-router-dom';
import AddButton from './AddButton';

import './CardSingle.scss';



class CardSingle extends React.Component {
    render() {
      const { magicCard } = this.props;
      const { userDecks, userBinders } = this.props;
      const {
        id,
        image_uris,
      } = magicCard;


      let cardColor = '';
      let images;

      if (image_uris=== null || image_uris === undefined){
        const cardFace = magicCard.card_faces[0]
        const { image_uris } = cardFace;
        images = Object.values(image_uris);
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
                <CardHeader className="my-card-header">
                  <CardTitle className="my-card-title">Add to : </CardTitle>
                  {addToDeck} {addToBinder}
                </CardHeader>
                <Link to={`/card/${id}`}>
                  <MDBCardImage className={`${cardColor} magic-card-image`} width="100%" src={images[1]} alt="Card image cap" />
                </Link>
                <p>{magicCard.name}</p>
              </Card>
              </Col>
      );
    }
}

export default CardSingle;
