import React from 'react';
import {  Container, Button, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import CardSingle from './CardSingle';

class CardContainer extends React.Component {
    render() {
      const { cardsReturned } = this.props;
      const cardstoPrint = cardsReturned.map(card => (
          <CardSingle key={card.id} magicCard={card} />
        ));

        return(
            <div className="CardContainer">
              <Container className="Card-Container themed-container" fluid={true}>
                <Row xs="1" sm="2" md="4">
                  {cardstoPrint}
                </Row>
              </Container>
            </div>
        );
    }
}

export default CardContainer;