import React from 'react'
import { Button, Collapse, Fade } from 'reactstrap';
import symbolData from '../../data/symbolData';
import './CardDetails.scss';
class CardInfo extends React.Component{

  state = {
    cardManaCost: [],
    faceAManaCost: [],
    faceBManaCost: [],
    faceOpen: true,
  }

  toggleFace = () => this.setState({ faceOpen: !this.state.faceOpen })


  checkMana = () => {
    const card = this.props.cardItem;
    const cardManaCost = this.props.cardItem.manaCost;
    const cardFaces = this.props.cardItem.cardFaces;

    if(cardManaCost === null && cardFaces.length > 0){
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

  componentDidMount(){
    this.checkMana();
  }

  render() {
    const { cardItem } = this.props;
    
    if(cardItem.cardFaces.length >=0){
      const cardFaceA = cardItem.cardFaces[0]
      const cardFaceB = cardItem.cardFaces[1]

      const faceAManaImgs = this.state.faceAManaCost.map((uri, index) => (
        <img key={`${uri}_${index}`} src={uri} className="info-mana-img" />
      ))
      const faceBManaImgs = this.state.faceBManaCost.map((uri, index) => (
        <img key={`${uri}_${index}`} src={uri} className="info-mana-img" />
      ))
      return(
        <div className="CardInfo">



          <div>
            <Fade in={this.state.faceOpen}>
              <Collapse isOpen={this.state.faceOpen}>
                <img className="card-info-img" src={cardFaceA.cardFaceImageUris.large}/>
              </Collapse>
            </Fade>
            <Fade in={!this.state.faceOpen}>
              <Collapse isOpen={!this.state.faceOpen}>
                <img className="card-info-img" src={cardFaceB.cardFaceImageUris.large}/>
              </Collapse>
            </Fade>
            <Button onClick={this.toggleFace}> flip </Button>
          </div>


          <div onClick={this.toggleFace}>
          <Fade in={this.state.faceOpen}>
            <Collapse isOpen={this.state.faceOpen}>
              <h3 className="info-list-item-name">{cardFaceA.name}</h3>
            </Collapse>
          </Fade>
          <Fade in={!this.state.faceOpen}>
            <Collapse isOpen={!this.state.faceOpen}>
              <h3 className="info-list-item-name">{cardFaceB.name}</h3>
            </Collapse>
          </Fade> 
        </div>

        <div onClick={this.toggleFace}>
          <Fade in={this.state.faceOpen}>
            <Collapse isOpen={this.state.faceOpen}>
            <h3>{cardFaceA.typeLine}</h3>
            <div className="info-oracle-txt">
              <p>{cardFaceA.oracleText}</p>
            </div>
            </Collapse>
          </Fade>
          <Fade in={!this.state.faceOpen}>
            <Collapse isOpen={!this.state.faceOpen}>
              <h3>{cardFaceB.typeLine}</h3>
              <div className="info-oracle-txt">
                <p>{cardFaceB.oracleText}</p>
              </div>
            </Collapse>
          </Fade>
        </div>

        <div onClick={this.toggleFace}>
        <Fade in={this.state.faceOpen}>
          <Collapse isOpen={this.state.faceOpen}>
            <div className="info-mana-img-con">{faceAManaImgs}</div>
          </Collapse>
        </Fade>
        <Fade in={!this.state.faceOpen}>
          <Collapse isOpen={!this.state.faceOpen}>
          <div className="info-mana-img-con">{faceBManaImgs}</div>
          </Collapse>
        </Fade>
        </div>

        <div onClick={this.toggleFace}>
          <Fade in={this.state.faceOpen}>
            <Collapse isOpen={this.state.faceOpen}>
              <p> {cardFaceA.power ? cardFaceA.power : "/"} </p>
            </Collapse>
          </Fade>
          <Fade in={!this.state.faceOpen}>
            <Collapse isOpen={!this.state.faceOpen}>
              <p> {cardFaceB.power ? cardFaceB.power : "/"} </p>
            </Collapse>
          </Fade>
        </div>

        <div onClick={this.toggleFace}>
          <Fade in={this.state.faceOpen}>
            <Collapse isOpen={this.state.faceOpen}>
              <p> {cardFaceA.toughness ? cardFaceA.toughness : "/"} </p>
            </Collapse>
          </Fade>

          <Fade in={!this.state.faceOpen}>
            <Collapse isOpen={!this.state.faceOpen}>
              <p> {cardFaceB.toughness ? cardFaceB.toughness : "/"} </p>
            </Collapse>
          </Fade>
        </div>

        <div onClick={this.toggleFace}>
          <Fade in={this.state.faceOpen}>
            <Collapse isOpen={this.state.faceOpen}>
              <p> {cardFaceA.loyalty ? cardFaceA.loyalty : "/"} </p>
            </Collapse>
          </Fade>
          <Fade in={!this.state.faceOpen}>
            <Collapse isOpen={!this.state.faceOpen}>
              <p> {cardFaceB.loyalty ? cardFaceB.loyalty : "/"} </p>
            </Collapse>
          </Fade>
        </div>



        </div>
      )
    }
    else{
      return(
        <div className="CardInfo">
          <h1>{cardItem.name}</h1>
          <h1>{cardItem.artist}</h1>
          <img className="list-item-img" src={cardItem.imageUris.large}/>
        </div>
      )
    }
  }
}

export default CardInfo;