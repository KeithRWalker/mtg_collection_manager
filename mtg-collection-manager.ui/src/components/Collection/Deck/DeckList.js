import React from 'react'
import DeckListItem from './DeckListItem';
import { Table } from 'reactstrap';

import './DeckStyle.scss';

class DeckList extends React.Component{
  render(){
    const cardInfo = this.props.cardInfo;
    const deckListItems = cardInfo.map(card => (
      <DeckListItem key={`deckListItem_${card.id}`} card={card} loadDeckInfo={this.props.loadDeckInfo}/>
    ))

    return(
        <Table className="DeckList" hover dark striped bordered responsive>
          <thead>
            <tr>
              <th>Remove</th>
              <th></th>
              <th>Name</th>
              <th>Type</th>
              <th>Mana Cost</th>
              <th>Power</th>
              <th>Toughness</th>
              <th>Loyalty</th>
              <th>Click to flip</th>
            </tr>
          </thead>
          <tbody>
            {deckListItems}
          </tbody>
        </Table>
    )
  }
}

export default DeckList;
