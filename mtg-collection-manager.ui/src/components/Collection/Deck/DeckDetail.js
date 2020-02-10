import React from 'react';
import { Table } from 'reactstrap';
import DeckList from './DeckList';

import deckData from '../../../data/deckData';
import sleeveData from '../../../data/sleeveData';


import './DeckStyle.scss';

class DeckDetail extends React.Component{
  state={
    deckInfo: {},
    cardInfo: []
  }

  loadDeckInfo = (deckId) => {
    deckData.getDeckById(deckId)
    .then(deckInfo => this.setState({ deckInfo }))
    .catch(err => console.error("error in DeckDetail.js => componentDidMount", err));
  sleeveData.getDeckCards(deckId)
    .then(cardInfo => this.setState({ cardInfo }))
    .catch(err => console.error("error in DeckDetail.js => componentDidMount", err));
  }

  deleteCard = (cardId) => {
    const deckId = this.state.deckInfo.id;
    const deleteRequest = {
      CardId: cardId,
      DeckId: deckId
    }
    console.log(deleteRequest);
    sleeveData.deleteCardFromDeck(deleteRequest)
    const newCards = [];
    sleeveData.getDeckCards(this.props.match.params.deckId)
      .then((cardInfo) => {
        this.loadDeckInfo(this.props.match.param.deckId);
      })
      .catch(err => console.error("error in DeckDetail.js => deleteCard() =>getDeckCards()", err))
      
  }

  componentDidMount() {
    const deckId = this.props.match.params.deckId
    this.loadDeckInfo(deckId);
  }
  
  render() {
    const { deckInfo, cardInfo } = this.state
    return(
      <div className="DeckDetail">
        <h3>{deckInfo.name}</h3>
        <h5>Total Cards: {cardInfo.length}</h5>
        <div className="deck-list-con">
        <DeckList key={`DeckList_${deckInfo.id}`} cardInfo={cardInfo} deleteCard={this.deleteCard} />
        </div>
      </div>
    )
  }
}

export default DeckDetail;