import React from 'react';
import {
  Button,
  CardDeck,
  Input,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter 
} from 'reactstrap';
import binderData from '../../data/binderData';
import deckData from '../../data/deckData';
import Binder from './Binder';
import Deck from './Deck';
import './CollectionPage.scss';
const defaultInput = {
  name: "",
  description: "",
  type: "",
}
class CollectionPage extends React.Component{

  state = {
    userBinders: [],
    userDecks: [],
    binderModalOpen: false,
    deckModalOpen: false,
    binderSubmit: defaultInput,
    deckSubmit: defaultInput
  }

  componentDidMount() {
    this.loadCollection();
  }

  loadCollection = () => {
    deckData.getUserDecks()
    .then((resp) => {
      this.setState({ userDecks: resp })
      binderData.getUserBinders()
      .then((resp) => {
        this.setState({ userBinders: resp })
      })
    })
    .catch(err => console.error(err, "Error in componentDidMount // CollectionPage.js"))
  }

  toggleBinderModal = () => this.setState({ binderModalOpen: !this.state.binderModalOpen });
  binderNameUpdate = e => this.updateBinderState(e, 'name');
  binderDescriptionUpdate = e => this.updateBinderState(e, 'description');
  updateBinderState = (e, formName) => {
    const binderObject = { ...this.state.binderSubmit }
    binderObject[formName] = e.target.value;
    this.setState({ binderSubmit: binderObject })
  }
  binderSubmit = (e) => {
    e.preventDefault();
    const binderObject = { ...this.state.binderSubmit };
    binderData.postNewBinder(binderObject).then(() => {
      this.toggleBinderModal()
      this.loadCollection();
    })
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
      this.loadCollection();
    })
  }

  render() {
    const { binderModalOpen, deckModalOpen, binderSubmit, deckSubmit } = this.state;

    const bindersToShow = this.state.userBinders.map(binder => (
      <Binder userBinder={binder} key={binder.id}/>
    ));

    const decksToShow = this.state.userDecks.map(deck => (
      <Deck userDeck={deck} key={deck.id}/>
    ));

    return(
      <div className="CollectionPage">
        
        <div className="binder-section-container">

          <div className="binders-label">
            <h1>Binders:</h1>
            <Button className="add-binder-btn" size="sm" onClick={this.toggleBinderModal}>Add a Binder</Button>
          </div>

          <div className="binder-container">
            <CardDeck>
              {bindersToShow}
            </CardDeck>
          </div>

          <div>
            <Modal isOpen={binderModalOpen} toggle={this.toggleBinderModal} className="binder-modal">
              <ModalHeader toggle={this.toggleBinderModal}> Add a Binder</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  name="binderName"
                  placeholder="Name"
                  value={binderSubmit.name}
                  onChange={this.binderNameUpdate}
                />
                <Input
                  type="textarea"
                  rows={4}
                  name="binderDescription"
                  placeholder="Description"
                  value={binderSubmit.description}
                  onChange={this.binderDescriptionUpdate}
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={this.toggleBinderModal}>Cancel</Button>{' '}
                <Button type="submit" onClick={this.binderSubmit}>Submit</Button>{' '}
              </ModalFooter>
            </Modal>
          </div>
        </div>

        <div className="deck-section-container">

          <div className="decks-label">
            <h1>Decks: </h1>
            <Button className="add-deck-btn" size="sm" onClick={this.toggleDeckModal}>Add a Deck</Button>
          </div>

          <div className="deck-container">
            <CardDeck>
              {decksToShow}
            </CardDeck>
          </div>
          
          <div>

            

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
    );
  }
}

