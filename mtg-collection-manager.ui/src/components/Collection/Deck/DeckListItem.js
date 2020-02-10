import React from 'react'
import { Fade, Collapse, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import check from './check.png';
import symbolData from '../../../data/symbolData';
import sleeveData from '../../../data/sleeveData';


class DeckListItem extends React.Component {
  state = {
    cardManaCost: [],
    faceAManaCost: [],
    faceBManaCost: [],
    modal: false,
    faceAOpen: true,
    faceBOpen: false,
  };

  componentDidMount(){
    this.checkMana()
  }

  toggleFace = () => this.setState({ faceAOpen: !this.state.faceAOpen, faceBOpen: !this.state.faceBOpen })
  toggle = () => this.setState({ modal: !this.state.modal });
  
  deleteThisCard = () => {
    this.props.deleteCard(this.props.card.id);
    this.toggle();
  }


  
  checkMana = () => {
    const card = this.props.card;
    const cardManaCost = card.manaCost;

    if(cardManaCost === null && card.cardFaces.length > 0){
      card.cardFaces.forEach((face, index) => {
        const faceManaCost = face.manaCost;
        if(faceManaCost != "" || faceManaCost.length >= 3) {
          var faceManaArray = faceManaCost.split(/(?<=}).*?(?={)/g);
            var obj = { SymbolCodes: faceManaArray };
              symbolData.getUrisForSymbols(obj)
                .then((resp) => {
                  if(index === 0){
                    this.setState({ faceAManaCost: resp })
                  }
                  else if(index === 1){
                    this.setState({ faceBManaCost: resp })
                  }
                })
                .catch(err => console.error(err));
        }
      });
    }

    else if(cardManaCost != null) {
      var manaArray = cardManaCost.split(/(?<=}).*?(?={)/g);
      var obj = { SymbolCodes: manaArray }
    symbolData.getUrisForSymbols(obj)
      .then(resp => this.setState({ cardManaCost: resp }))
      .catch(err => console.error(err));
    }
  }

  render(){
    const card = this.props.card;
    const manaImgs = this.state.cardManaCost.map((uri, index) => (
      <img key={`${uri}_${index}`} src={uri} className="deck-mana-img" />
    ))

    if(card.cardFaces.length > 0){
      const cardFaceA = card.cardFaces[0];
      const cardFaceB = card.cardFaces[1];

      const faceAManaImgs = this.state.faceAManaCost.map((uri, index) => (
        <img key={`${uri}_${index}`} src={uri} className="deck-mana-img" />
      ))
      const faceBManaImgs = this.state.faceBManaCost.map((uri, index) => (
        <img key={`${uri}_${index}`} src={uri} className="deck-mana-img" />
      ))
      return(
        <tr className="DeckListItem" id={`${card.id}_popover`}>

        <td>
        <Button color="danger" onClick={this.toggle}>X</Button>
        </td>

        <td className="img-td" onClick={this.toggleFace}>
          <Fade in={this.state.faceAOpen}>
            <Collapse isOpen={this.state.faceAOpen}>
              <img className="list-item-img img-a" src={cardFaceA.cardFaceImageUris.artCrop}/>
            </Collapse>
          </Fade>
          <Fade in={!this.state.faceAOpen}>
            <Collapse isOpen={!this.state.faceAOpen}>
              <img className="list-item-img img-b" src={cardFaceB.cardFaceImageUris.artCrop}/>
            </Collapse>
          </Fade>
        </td>

        <td onClick={this.toggleFace}>
          <Fade in={this.state.faceAOpen}>
            <Collapse isOpen={this.state.faceAOpen}>
              <h3 className="list-item-name"><NavLink to={`../card/${card.scryId}`}>{cardFaceA.name}</NavLink></h3>
            </Collapse>
          </Fade>
          <Fade in={!this.state.faceAOpen}>
            <Collapse isOpen={!this.state.faceAOpen}>
              <h3 className="list-item-name"><NavLink to={`../card/${card.scryId}`}>{cardFaceB.name}</NavLink></h3>
            </Collapse>
          </Fade> 
        </td>

        <td onClick={this.toggleFace}>
          <Fade in={this.state.faceAOpen}>
            <Collapse isOpen={this.state.faceAOpen}>
            <h3>{cardFaceA.typeLine}</h3>
            <div className="oracle-txt">
              <p>{cardFaceA.oracleText}</p>
            </div>
            </Collapse>
          </Fade>
          <Fade in={!this.state.faceAOpen}>
            <Collapse isOpen={!this.state.faceAOpen}>
              <h3>{cardFaceB.typeLine}</h3>
              <div className="oracle-txt">
                <p>{cardFaceB.oracleText}</p>
              </div>
            </Collapse>
          </Fade>
        </td>

        <td onClick={this.toggleFace}>
        <Fade in={this.state.faceAOpen}>
          <Collapse isOpen={this.state.faceAOpen}>
            <div className="mana-img-con">{faceAManaImgs}</div>
          </Collapse>
        </Fade>
        <Fade in={!this.state.faceAOpen}>
          <Collapse isOpen={!this.state.faceAOpen}>
          <div className="mana-img-con">{faceBManaImgs}</div>
          </Collapse>
        </Fade>
        </td>

        <td onClick={this.toggleFace}>
          <Fade in={this.state.faceAOpen}>
            <Collapse isOpen={this.state.faceAOpen}>
              <p> {cardFaceA.power ? cardFaceA.power : "/"} </p>
            </Collapse>
          </Fade>
          <Fade in={!this.state.faceAOpen}>
            <Collapse isOpen={!this.state.faceAOpen}>
              <p> {cardFaceB.power ? cardFaceB.power : "/"} </p>
            </Collapse>
          </Fade>
        </td>

        <td onClick={this.toggleFace}>
          <Fade in={this.state.faceAOpen}>
            <Collapse isOpen={this.state.faceAOpen}>
              <p> {cardFaceA.toughness ? cardFaceA.toughness : "/"} </p>
            </Collapse>
          </Fade>

          <Fade in={!this.state.faceAOpen}>
            <Collapse isOpen={!this.state.faceAOpen}>
              <p> {cardFaceB.toughness ? cardFaceB.toughness : "/"} </p>
            </Collapse>
          </Fade>
        </td>

        <td onClick={this.toggleFace}>
          <Fade in={this.state.faceAOpen}>
            <Collapse isOpen={this.state.faceAOpen}>
              <p> {cardFaceA.loyalty ? cardFaceA.loyalty : "/"} </p>
            </Collapse>
          </Fade>
          <Fade in={!this.state.faceAOpen}>
            <Collapse isOpen={!this.state.faceAOpen}>
              <p> {cardFaceB.loyalty ? cardFaceB.loyalty : "/"} </p>
            </Collapse>
          </Fade>
        </td>

        <td onClick={this.toggleFace}>
        <img className="deck-check" src={check}/>
        </td>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>Are You Sure?</ModalHeader>
          <ModalBody>Are you sure you want to remove {card.name} from your deck?</ModalBody>
          <ModalFooter>
            <Button onClick={this.deleteThisCard} color="danger"> Delete </Button>
            <Button onClick={this.toggle} color="secondary">Cancel</Button>
          </ModalFooter>
        </Modal>


      </tr>
      )
    }
    else
    return(
      <tr className="DeckListItem" id={`${card.id}_popover`}>

      <td>
      <Button color="danger" onClick={this.toggle}>X</Button>
      </td>

      <td>
        <img className="list-item-img" src={card.imageUris.artCrop}/>
      </td>

      <td>
        <h3 className="list-item-name"><NavLink to={`../card/${card.scryId}`}>{card.name}</NavLink></h3>
      </td>

      <td>
        <h3>{card.typeLine}</h3>
          <div className="oracle-txt">
            <p>{card.oracleText}</p>
          </div>
      </td>

      <td>
        <div className="mana-img-con">{manaImgs}</div>
      </td>

      <td>
        <p> {card.power ? card.power : "/"} </p>
      </td>

      <td>
        <p> {card.toughness ? card.toughness : "/"} </p>
      </td>

      <td>
        <p> {card.loyalty ? card.loyalty : "/"} </p>
      </td>

      <td>
        <p>/</p>
      </td>

      <Modal isOpen={this.state.modal} toggle={this.toggle}>
      <ModalHeader>Are You Sure?</ModalHeader>
      <ModalBody>Are you sure you want to remove {card.name} from your deck?</ModalBody>
      <ModalFooter>
        <Button onClick={this.deleteThisCard} color="danger"> Delete </Button>
        <Button onClick={this.toggle} color="secondary">Cancel</Button>
      </ModalFooter>
      </Modal>

    </tr>
    )
  }
}

export default DeckListItem;
