import React from 'react'
import { 
  Button,
  ButtonDropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem 
} from 'reactstrap';

import cardData from '../../data/cardData';
import binderData from '../../data/binderData';
import deckData from '../../data/deckData';

class AddButton extends React.Component{
  state = {
    dropdownOpen: false,
  }

  addToCollection = (e) => {
    e.preventDefault();
    const collectionValue = e.target.value
    const {scryId, type} = this.props;
    cardData.addCardToUser(scryId)
      .then((resp) => {
        const userCardId = resp.id;
        const sleeve = {
          collectionId: collectionValue,
          cardId: userCardId
        };

        if(type === "Binder"){
          binderData.attachBinderSleeve(sleeve)
        }
        if(type === "Deck"){
          deckData.attachDeckSleeve(sleeve)
        }  
      })
      .catch(err => console.error("error in AddButton.js // addToCollection()"))
    console.log(`adding ${scryId} to ${e.target.value}`)
  }

  ddToggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen })
  render(){
    const { dropdownOpen } = this.state;
    const { type, collection } = this.props
    const ddItems = Object.entries(collection).map(entry => 
      entry.map((item) => <DropdownItem value={item.id} onClick={this.addToCollection} key={`key_${item.id}`}>{item.name}</DropdownItem>)
      )
    return(
      <div className="AddButton">
        <ButtonDropdown isOpen={dropdownOpen} toggle={this.ddToggle}>
          <DropdownToggle caret>
            {`Add to ${type}`}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>{`${type}s`}</DropdownItem>
            {ddItems}
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    )
  }
}

export default AddButton;