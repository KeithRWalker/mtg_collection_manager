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
    faceAImg:'https://img.scryfall.com/card_backs/image/large/59/597b79b3-7d77-4261-871a-60dd17403388.jpg?1548988262',
    faceBImg:'https://img.scryfall.com/card_backs/image/large/59/597b79b3-7d77-4261-871a-60dd17403388.jpg?1548988262',
    cardImg: 'https://img.scryfall.com/card_backs/image/large/59/597b79b3-7d77-4261-871a-60dd17403388.jpg?1548988262',
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
    const cardId = this.props.card.id;
    sleeveData.deleteCardFromDeck(cardId)
      this.props.loadDeckInfo()
      this.toggle();
  }

  
  checkMana = () => {
    const card = this.props.card;
    const cardManaCost = card.manaCost;

    if(cardManaCost === null && card.cardFaces.length > 0){
      card.cardFaces.forEach((face, index) => {
        const faceManaCost = face.manaCost;
        if(faceManaCost !== "" || faceManaCost.length >= 3) {
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
      <img key={`${uri}_${index}`} src={uri} className="deck-mana-img" alt="mana symbol" />
    ))

    if(card.cardFaces.length > 0){
      const cardFaceA = card.cardFaces[0];
      const cardFaceB = card.cardFaces[1];
      let cardImgs;

      if(cardFaceA.cardFaceImageUris == null || cardFaceB.cardFaceImageUris == null){
        cardImgs = <td className="img-td" onClick={this.toggleFace}><img className="list-item-img" src={card.imageUris.artCrop} alt={card.name ? card.name : 'Magic Card'}/></td>
      }
      else{
        cardImgs = <td className="img-td" onClick={this.toggleFace}>
                    <Fade in={this.state.faceAOpen}>
                      <Collapse isOpen={this.state.faceAOpen}>
                        <img className="list-item-img img-a" src={cardFaceA.cardFaceImageUris.artCrop} alt={cardFaceA.name ? cardFaceA.name : ''} />
                      </Collapse>
                    </Fade>
                    <Fade in={!this.state.faceAOpen}>
                      <Collapse isOpen={!this.state.faceAOpen}>
                        <img className="list-item-img img-b" src={cardFaceB.cardFaceImageUris.artCrop} alt={cardFaceB.name ? cardFaceB.name : ''} />
                      </Collapse>
                    </Fade>
                    </td>
      }


      const faceAManaImgs = this.state.faceAManaCost.map((uri, index) => (
        <img key={`${uri}_${index}`} src={uri} className="deck-mana-img" alt="mana-img" />
      ))
      const faceBManaImgs = this.state.faceBManaCost.map((uri, index) => (
        <img key={`${uri}_${index}`} src={uri} className="deck-mana-img" alt="mana-img" />
      ))

      

      return(
        <tr className="DeckListItem" id={`${card.id}_popover`}>

        <td>
          <Button className="del-deck" color="danger" onClick={this.toggle}>X</Button>        
        </td>  
        
        {cardImgs}
        


        <td onClick={this.toggleFace}>
          <Fade in={this.state.faceAOpen}>
            <Collapse isOpen={this.state.faceAOpen}>
              <h3 className="list-item-name"><NavLink to={`../card/${card.scryId}`}>{cardFaceA.name ? cardFaceA.name : ''}</NavLink></h3>
            </Collapse>
          </Fade>
          <Fade in={!this.state.faceAOpen}>
            <Collapse isOpen={!this.state.faceAOpen}>
              <h3 className="list-item-name"><NavLink to={`../card/${card.scryId}`}>{cardFaceB.name ? cardFaceB.name : ''}</NavLink></h3>
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
              <p> {cardFaceA.power ? cardFaceA.power : ""} </p>
            </Collapse>
          </Fade>
          <Fade in={!this.state.faceAOpen}>
            <Collapse isOpen={!this.state.faceAOpen}>
              <p> {cardFaceB.power ? cardFaceB.power : ""} </p>
            </Collapse>
          </Fade>
        </td>

        <td onClick={this.toggleFace}>
          <Fade in={this.state.faceAOpen}>
            <Collapse isOpen={this.state.faceAOpen}>
              <p> {cardFaceA.toughness ? cardFaceA.toughness : ""} </p>
            </Collapse>
          </Fade>

          <Fade in={!this.state.faceAOpen}>
            <Collapse isOpen={!this.state.faceAOpen}>
              <p> {cardFaceB.toughness ? cardFaceB.toughness : ""} </p>
            </Collapse>
          </Fade>
        </td>

        <td onClick={this.toggleFace}>
          <Fade in={this.state.faceAOpen}>
            <Collapse isOpen={this.state.faceAOpen}>
              <p> {cardFaceA.loyalty ? cardFaceA.loyalty : ""} </p>
            </Collapse>
          </Fade>
          <Fade in={!this.state.faceAOpen}>
            <Collapse isOpen={!this.state.faceAOpen}>
              <p> {cardFaceB.loyalty ? cardFaceB.loyalty : ""} </p>
            </Collapse>
          </Fade>
        </td>

        <td onClick={this.toggleFace}>
        <img className="deck-check" src={check} alt="flippable checkmark"/>
        </td>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>Are You Sure?</ModalHeader>
          <ModalBody>Are you sure you want to remove {card.name ? card.name : 'N/A'} from your deck?</ModalBody>
          <ModalFooter>
            <Button onClick={this.deleteThisCard} color="danger"> Delete </Button>
            <Button onClick={this.toggle} color="secondary">Cancel</Button>
          </ModalFooter>
        </Modal>


      </tr>
      )
    }
    else {
  
      return (
        <tr className="DeckListItem" id={`${card.id}_popover`}>
  
        <td>
        <Button color="danger" onClick={this.toggle}>X</Button>
        </td>
  
        <td>
          <img className="list-item-img" src={card.imageUris ? card.imageUris.artCrop : 'https://img.scryfall.com/card_backs/image/large/59/597b79b3-7d77-4261-871a-60dd17403388.jpg?1548988262'} alt="magic card back"/>
        </td>
  
        <td>
          <h3 className="list-item-name"><NavLink to={`../card/${card.scryId}`}>{card.name ? card.name : 'N/A'}</NavLink></h3>
        </td>
  
        <td>
          <h3>{card.typeLine ? card.typeLine : ''}</h3>
            <div className="oracle-txt">
              <p>{card.oracleText}</p>
            </div>
        </td>
  
        <td>
          <div className="mana-img-con">{manaImgs ? manaImgs : ''}</div>
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
        <ModalBody>Are you sure you want to remove {card.name ? card.name : ''} from your deck?</ModalBody>
        <ModalFooter>
          <Button onClick={this.deleteThisCard} color="danger"> Delete </Button>
          <Button onClick={this.toggle} color="secondary">Cancel</Button>
        </ModalFooter>
        </Modal>
  
      </tr>
      )

    }
  }
}

export default DeckListItem;
