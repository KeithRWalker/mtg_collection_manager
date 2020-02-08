import React from 'react';
import {  Container, Row } from 'reactstrap';
//import { Link } from 'react-router-dom';
import CardSingle from './CardSingle';

import deckData from '../../data/deckData';
import binderData from '../../data/binderData';

class CardContainer extends React.Component {
    state={
      userDecks: [],
      userBinders: [],
      userCollection: [],
    }

    componentDidMount(){
      this.getUserCollection();
    }

    getUserCollection = () => {
      binderData.getUserBinders()
        .then((resp) => {

          resp.forEach((binder) => {
            const { id, name } = binder
            const binderInfo = {
              id: id,
              name: name
            };
            this.state.userBinders.push(binderInfo);
          });

          deckData.getUserDecks()
            .then((resp) => {
              resp.forEach((deck) => {
                const { id, name } = deck
                const deckInfo = {
                  id: id,
                  name: name
                };
                this.state.userDecks.push(deckInfo);
              })
            })
        })
    }
    render() {
      const { userBinders, userDecks } = this.state;
      const { cardsReturned } = this.props;
      const cardstoPrint = cardsReturned.map(card => (
          <CardSingle key={card.id} magicCard={card} userBinders={userBinders} userDecks={userDecks} />
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