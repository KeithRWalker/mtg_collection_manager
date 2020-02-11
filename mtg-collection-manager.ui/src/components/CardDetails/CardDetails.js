import React from 'react';
import CardInfo from './CardInfo';
import cardData from '../../data/cardData';

class CardDetails extends React.Component {
  state={
    cardInformation: []
  }
  loadCardData = (cardId) => {
    cardData.getCardByScryId(cardId)
      .then((resp) => {
        this.setState({ cardInformation: resp })        
      }).catch(err => console.error(err));
  }
  componentDidMount(){
    const cardId = this.props.match.params.cardId;
    this.loadCardData(cardId);
  }

    render(){
        const cardInformation = this.state.cardInformation;
        const cardMap = this.state.cardInformation.map(cardItem => (
          <CardInfo cardItem={cardItem} key={`${cardItem.scryId}_key_details`} />
        ))
        return(
            <div className="CardDetails">
              {cardMap}
            </div>
        );
    }
}

export default CardDetails;
