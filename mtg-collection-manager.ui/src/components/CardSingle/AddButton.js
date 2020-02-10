import React from 'react'
import { 
  ButtonDropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem 
} from 'reactstrap';

import cardData from '../../data/cardData';

import './CardSingle.scss';

class AddButton extends React.Component{
  state = {
    dropdownOpen: false,
  }

  addToCollection = (e) => {
    e.preventDefault();
    const collectionValue = e.target.value
    const type = this.props.type;
    const scryId = this.props.scryId;
    const additionInfo = {
      scryId: scryId,
      collectionId: collectionValue,
      collectionType: type
    }
    cardData.addCardToUser(additionInfo)
  }

  ddToggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen })
  render(){
    const { dropdownOpen } = this.state;
    const myCollection = this.props.collection;
    const { type } = this.props;

    const ddBtns = myCollection.map(x => <DropdownItem size="sm" value={x.id} onClick={this.addToCollection} key={`key_${x.id}`}>{x.name}</DropdownItem>)
    return(
      <div className="AddButton">
        <ButtonDropdown className="add-btn-dd" isOpen={dropdownOpen} toggle={this.ddToggle} direction="right">
          <DropdownToggle className="dd-toggle">
            {`${type}`}
          </DropdownToggle>
          <DropdownMenu right>
            {ddBtns}
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    )
  }
}

export default AddButton;