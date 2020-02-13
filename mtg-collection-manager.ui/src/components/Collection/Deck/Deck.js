import React from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardHeader, MDBBtn, MDBCardImage, MDBCol } from "mdbreact";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import deckData from '../../../data/deckData';
import './DeckStyle.scss';

class Deck extends React.Component{
  state={
    modal: false
  }

  toggle = () => this.setState({ modal: !this.state.modal });

  deleteDeck = () => {
    deckData.deleteDeck(this.props.userDeck.id)
    this.props.loadDeckCollection();
    this.toggle();
  }

  render() {
    const {userDeck} = this.props;
    return(
      <div className="Deck" >

        <MDBCol className="my-deck-col">

        <MDBCard style={{ width: "22rem" }} className="my-deck-card">
        <MDBCardHeader color="my-deck-header"><Link className="my-deck-link" to={`/deck/${userDeck.id}`}>{userDeck.name}</Link></MDBCardHeader>
          <button onClick={this.toggle} type="button" className="close" aria-label="Close">
            <span className="x" aria-hidden="true">×</span>
          </button>
          <Link className="my-deck-link" to={`/deck/${userDeck.id}`}><MDBCardImage className="img-fluid my-deck-img" src="https://img.scryfall.com/card_backs/image/large/59/597b79b3-7d77-4261-871a-60dd17403388.jpg?1548988262" waves /></Link>
          <MDBCardBody className="my-deck-body" >
            <MDBCardText className="my-deck-txt">
              {userDeck.description ? userDeck.description : ``}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>

      <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <button type="button" className="close" aria-label="Close" onClick={this.toggle}>
          <span aria-hidden="true">×</span>
        </button>
        <ModalHeader>Are You Sure?</ModalHeader>
        <ModalBody>Are you sure you want to delete {userDeck.name ? userDeck.name : 'N/A'} from your deck?</ModalBody>
        <ModalFooter>
          <MDBBtn onClick={this.deleteDeck} color="danger"> Delete </MDBBtn>
          <MDBBtn onClick={this.toggle} color="secondary">Cancel</MDBBtn>
        </ModalFooter>
      </Modal>
      </div>
    )
  }
}

export default Deck;