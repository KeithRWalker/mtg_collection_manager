import React from 'react'
import {
  Button,
  CardDeck,
  Input,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter 
} from 'reactstrap';
import deckData from '../../../data/deckData';
import Deck from './Deck';
import './DeckStyle.scss';

const defaultInput = {
  name: "",
  description: "",
  type: "",
}

class DeckCollectionPage extends React.Component{
  state = {
    userDecks: [],
    deckModalOpen: false,
    deckSubmit: defaultInput
  }
  componentDidMount() {
    this.loadDeckCollection();
  }

  loadDeckCollection = () => {
    deckData.getUserDecks()
    .then((resp) => {
      this.setState({ userDecks: resp })
    }).catch(err => console.error(err, "Error in loadDeckCollection => componentDidMount // DeckCollectionPage.js"))
  }

  toggleDeckModal = () => this.setState({ deckModalOpen: !this.state.deckModalOpen });
  deckNameUpdate = e => this.updateDeckState(e, 'name');
  deckDescriptionUpdate = e => this.updateDeckState(e, 'description');
  updateDeckState = (e, formName) => {
    const deckObject = { ...this.state.deckSubmit }
    deckObject[formName] = e.target.value;
    this.setState({ deckSubmit: deckObject })
  }
  deckSubmit = (e) => {
    e.preventDefault();
    const deckObject = { ...this.state.deckSubmit };
    deckData.postNewDeck(deckObject).then(() => {
      this.toggleDeckModal();
      this.loadDeckCollection();
    })
  }


  render(){
    const { deckModalOpen, deckSubmit } = this.state;

    const decksToShow = this.state.userDecks.map(deck => (
      <Deck userDeck={deck} key={deck.id} loadDeckCollection={this.loadDeckCollection}/>
    ));

    return(
      <div className="DeckCollectionPage page comp">
      
        <div className="PageCon">
        
          <div className="deck-collection-container">

            <div className="decks-label">
              <h1>Decks: </h1>
              <Button className="add-deck-btn" size="sm" onClick={this.toggleDeckModal}>Add a Deck</Button>
            </div>
            <div className="deck-container">
              <CardDeck>
                {decksToShow}
              </CardDeck>
            </div>

            <div className="deck-modal collection-modal">
            <Modal isOpen={deckModalOpen} toggle={this.toggleDeckModal} className="deck-modal">
              <ModalHeader toggle={this.toggleDeckModal}> Add a Deck</ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    name="deckName"
                    placeholder="Name"
                    value={deckSubmit.name}
                    onChange={this.deckNameUpdate}
                  />
                  <Input
                    type="textarea"
                    rows={4}
                    name="deckDescription"
                    placeholder="Description"
                    value={deckSubmit.description}
                    onChange={this.deckDescriptionUpdate}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button onClick={this.toggleDeckModal}>Cancel</Button>
                  <Button type="submit" onClick={this.deckSubmit}>Submit</Button>{' '}
                </ModalFooter>
                </Modal>
              </div>
            </div>
          </div>
          
      </div>
    )
  }
}

export default DeckCollectionPage;
