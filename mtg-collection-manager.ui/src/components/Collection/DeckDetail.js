import React from 'react';
import { Card } from 'reactstrap';
import deckData from '../../data/deckData';
import './CollectionPage.scss';
import sleeveData from '../../data/sleeveData';

class DeckDetail extends React.Component{
  componentDidMount() {
    const deckId = this.props.match.params.deckId
    deckData.getDeckById(deckId)
      .then(deckInfo => this.setState({ deckInfo }))
      .catch(err => console.error("error in DeckDetail.js => componentDidMount", err));
    sleeveData.getDeckCards(deckId)
      .then(cardInfo => this.setState({ cardInfo }))
      .catch(err => console.error("error in DeckDetail.js => componentDidMount", err));
  }
  
  render() {
    
    return(
      <div className="DeckDetail">
        <Card>
          DeckDetail
        </Card>
      </div>
    )
  }
}

export default DeckDetail;