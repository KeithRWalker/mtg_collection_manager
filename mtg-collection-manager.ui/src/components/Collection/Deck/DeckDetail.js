import React from 'react';
import DeckList from './DeckList';

import deckData from '../../../data/deckData';
import sleeveData from '../../../data/sleeveData';


import './DeckStyle.scss';

class DeckDetail extends React.Component{
  state={
    deckInfo: {},
    cardInfo: []
  }

  loadDeckInfo = () => {
    const deckId = this.props.match.params.deckId;
    deckData.getDeckById(deckId)
      .then((deckInfo) => {
        this.setState({ deckInfo })
        sleeveData.getDeckCards(deckId)
          .then((cardInfo) => {
            const cardArray = [];
            cardInfo.forEach(card => {
              cardArray.push(card);
            })
            this.setState({ cardInfo: cardArray })
        })
      })
      .catch(err => console.error("error in DeckDetail.js => componentDidMount", err));

      //.catch(err => console.error("error in DeckDetail.js => componentDidMount", err));
  }

  deleteCard = (cardId) => {
    sleeveData.deleteCardFromDeck(cardId);
    this.loadDeckInfo();
  }

  componentDidMount() {
    this.loadDeckInfo();
  }
  
  render() {
    const { deckInfo, cardInfo } = this.state
    return(
      <div className="DeckDetail page comp">
        <h3>{deckInfo.name}</h3>
        <h5>Total Cards: {cardInfo.length}</h5>
        <div className="deck-list-con">
        <DeckList key={`DeckList_${deckInfo.id}`} cardInfo={cardInfo} loadDeckInfo={this.loadDeckInfo} deleteCard={this.deleteCard}/>
        </div>
      </div>
    )
  }
}

export default DeckDetail;