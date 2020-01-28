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

import './CardSingle.scss';
class CardSingle extends React.Component {
    render() {
        let cardColor = '';
        const { magicCard } = this.props;
        const { image_uris } = magicCard
        const images = Object.values(image_uris)
        const colorId = Object.values(magicCard.color_identity)
        if(colorId.length > 0){
          colorId.forEach(color => {
            cardColor += `${color}`
          });
        } else if(colorId.length === 0){
          cardColor = `${colorId[0]}`
        }

        

        return(
                <Col className="CardSingle" xs="6" sm="4">
                <Card body inverse className={`${cardColor}`}>
                  <CardBody className={cardColor}>
                    <CardTitle>{magicCard.name}</CardTitle>
                  </CardBody>
                <img className="magic-card-image" width="100%" src={images[1]} alt="Card image cap" />
                    <CardBody>
                        <CardSubtitle>Artist: {magicCard.artist}</CardSubtitle>
                        <CardText>{magicCard.oracle_text}</CardText>
                    </CardBody>
                </Card>
                </Col>
        );
    }
}

export default CardSingle;