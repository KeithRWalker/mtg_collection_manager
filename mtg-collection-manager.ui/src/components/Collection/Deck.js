import React from 'react';
import { Card, CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import './CollectionPage.scss';

class Deck extends React.Component{
  render() {
    const {userDeck} = this.props;
    return(
      <div className="Deck">
        <Card className="user-deck">
          <CardTitle className="deck-title"><Link to={`/deck/${userDeck.id}`}>{userDeck.name}</Link></CardTitle>
          <CardSubtitle className="deck-subtitle">{userDeck.description}</CardSubtitle>
        </Card>
      </div>
    )
  }
}

export default Deck;