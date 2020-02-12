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


  checkRegImg = () => {
    const card = this.props.cardItem;
    const regImages = card.imageUris;

    if(regImages.large !== undefined){
      this.setState({ regImage: regImages.large })
    }
    else if (regImages.large === undefined){
      if(regImages.normal !== undefined){
        this.setState({ regImage: regImages.normal })
      }
      else if(regImages === undefined){
        if(regImages.small !== undefined){
          this.setState({ regImage: regImages.small })
        }
        else if (regImages.small === undefined){
          this.setState({ regImage: "https://img.scryfall.com/card_backs/image/large/59/597b79b3-7d77-4261-871a-60dd17403388.jpg?1548988262" })
        }
      }
    }
  }

  checkMana = () => {
    const card = this.props.cardItem;
    const cardManaCost = this.props.cardItem.manaCost;
    const cardFaces = this.props.cardItem.cardFaces;

    if(cardManaCost === null && cardFaces.length >= 0){
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
    if(this.props.cardItem.cardFaces < 0){
      this.checkRegImg();
    }
  }

  render() {
    const cardItem = this.props.cardItem;
    const legalities = cardItem.legalities;


    const legality = Object.entries(legalities).map(function (entry) {
      const gameName = entry[0].replace(/^\w/, c => c.toUpperCase());
      if(entry[1] === "legal"){
        return <div className="legal-con"><dt className="game-name-dt">{gameName}</dt> <dd className="is-legal dd-legality">Legal</dd></div>
      }
        return <div className="legal-con"><dt className="game-name-dt">{gameName}</dt> <dd className="is-not-legal dd-legality">Not Legal</dd></div>
    })

    
    if(cardItem.cardFaces.length > 0){
      const cardFaceA = cardItem.cardFaces[0]
      const cardFaceB = cardItem.cardFaces[1]
      let cardImgs;

      if(cardFaceA.cardFaceImageUris == null || cardFaceB.cardFaceImageUris == null){
        cardImgs = <div className="card-info-image-con" onClick={this.toggleFace}><img className="card-info-img" src={cardItem.imageUris.large} /></div>
      }
      else{
        cardImgs = <div className="img-td" onClick={this.toggleFace}>
                      <Fade in={this.state.faceOpen}>
                        <Collapse isOpen={this.state.faceOpen}>
                          <img className="card-info-img" src={cardFaceA.cardFaceImageUris.large}/>
                        </Collapse>
                      </Fade>
                      <Fade in={!this.state.faceAOpen}>
                        <Collapse isOpen={!this.state.faceOpen}>
                          <img className="card-info-img" src={cardFaceB.cardFaceImageUris.large}/>
                        </Collapse>
                      </Fade>
                    </div>
      }

      const faceAManaImgs = this.state.faceAManaCost.map((uri, index) => (
        <img key={`${uri}_${index}`} src={uri} className="info-mana-img" />
      ))
      const faceBManaImgs = this.state.faceBManaCost.map((uri, index) => (
        <img key={`${uri}_${index}`} src={uri} className="info-mana-img" />
      ))






      return(
        <div className="CardInfo">


            <div className="card-play-info-con">
              <div onClick={this.toggleFace}>
              {cardImgs}

                <Fade in={this.state.faceOpen}><Collapse isOpen={this.state.faceOpen}><h3>{cardFaceA.name}</h3></Collapse></Fade>
                <Fade in={!this.state.faceOpen}><Collapse isOpen={!this.state.faceOpen}><h3>{cardFaceB.name}</h3></Collapse></Fade>
                <Collapse isOpen={this.state.faceOpen}>
                  <h3>{cardFaceA.typeLine}</h3>
                  <div className="info-oracle-txt"><p>{cardFaceA.oracleText}</p></div>
                </Collapse>

                <Collapse isOpen={!this.state.faceOpen}>
                  <h3>{cardFaceB.typeLine}</h3>
                  <div className="info-oracle-txt"><p>{cardFaceB.oracleText}</p></div>
                </Collapse>

                <Fade in={this.state.faceOpen}><Collapse isOpen={this.state.faceOpen}><div>{faceAManaImgs}</div></Collapse></Fade>
                <Fade in={!this.state.faceOpen}><Collapse isOpen={!this.state.faceOpen}><div>{faceBManaImgs}</div></Collapse></Fade>
              </div>
            </div>


            <div className="card-market-info-con">
            <div className="card-info-prices-con">
              <h2>Prices</h2>
              <p>USD: {cardItem.prices.usd ? cardItem.prices.usd : 'Not Available'}</p>
              <p>USD/Foil: {cardItem.prices.usdFoil ? cardItem.prices.usdFoil : 'Not Available'}</p>
              <p>EUR: {cardItem.prices.eur ? cardItem.prices.eur : 'Not Available'}</p>
              <p>TIX: {cardItem.prices.tix ? cardItem.prices.tix : 'Not Available'}</p>
            </div>

            <div className="card-info-prices-con">
              <h2>Purchase</h2>
              <a target="_blank" href={cardItem.purchaseUris.cardhoarder ? cardItem.purchaseUris.cardhoarder : ''}>{cardItem.purchaseUris.cardhoarder ? 'Cardhoarder' : ''}</a>
              <a target="_blank" href={cardItem.purchaseUris.cardmarket ? cardItem.purchaseUris.cardmarket : ''}>{cardItem.purchaseUris.cardmarket ? 'Cardmarket' : ''}</a>
              <a target="_blank" href={cardItem.purchaseUris.tcgplayer ? cardItem.purchaseUris.tcgplayer : ''}>{cardItem.purchaseUris.tcgplayer ? 'TCGPlayer' : ''}</a>
            </div>
          </div>

        </div>
      )
    }
    else{
      return(
        <div className="CardInfo">


          <div className="card-con">
              <div className="card-info-img-con">
                <img className="card-info-img" src={cardItem.imageUris.large}/>
              </div>
                  <div className="side-of-card">
                      <div className="card-play-info-con">
                        <h4>{cardItem.name ? cardItem.name : ''}</h4>
                        <p>{cardItem.oracleText ? cardItem.oracleText : ''}</p>
                      </div>
                      <div className="misc-con">
                        <h5>{cardItem.typeLine ? cardItem.typeLine : ''}</h5>
                        <h6> {cardItem.power ? `Power: ${cardItem.power}` : ''}</h6>
                        <div className="stats">
                          <h6>{cardItem.toughness ? `Toughness: ${cardItem.toughness}` : ''}</h6>
                          <h6> {cardItem.loyalty ? `Loyalty: ${cardItem.loyalty}` : ''}</h6>
                          <h6> {cardItem.artist ? `Artist: ${cardItem.artist}` : ''}</h6>
                          <h6>  {cardItem.rarity ? `Rarity: ${cardItem.rarity}` : ''}</h6>
                        </div>
                  </div>
                  <div className="legality-con">
                    <h6>Legalities</h6>
                    <dl className="legality-dl">
                      {legality}
                    </dl>
                  </div>
              </div>
          </div>


            <div className="under-card">

              <div className="prices-purchase">

              <div className="prices">
                <h6>Prices</h6>
                <dl>
                  <dt>USD:</dt> <dd>{cardItem.prices.usd ? cardItem.prices.usd : 'Not Available'}</dd>
                  <dt>USD/Foil:</dt> <dd>{cardItem.prices.usdFoil ? cardItem.prices.usdFoil : 'Not Available'}</dd>
                  <dt>EUR:</dt> <dd>{cardItem.prices.eur ? cardItem.prices.eur : 'Not Available'}</dd>
                  <dt>TIX:</dt> <dd> {cardItem.prices.tix ? cardItem.prices.tix : 'Not Available'}</dd>
                </dl>
              </div>
  
              <div className="purchase">
              <h6>Purchase</h6>
              <a className="buy-link" target="_blank" href={cardItem.purchaseUris.cardhoarder ? cardItem.purchaseUris.cardhoarder : ''}>{cardItem.purchaseUris.cardhoarder ? 'Cardhoarder' : ''}</a>
              <a className="buy-link" target="_blank" href={cardItem.purchaseUris.cardmarket ? cardItem.purchaseUris.cardmarket : ''}>{cardItem.purchaseUris.cardmarket ? 'Cardmarket' : ''}</a>
              <a className="buy-link" target="_blank" href={cardItem.purchaseUris.tcgplayer ? cardItem.purchaseUris.tcgplayer : ''}>{cardItem.purchaseUris.tcgplayer ? 'TCGPlayer' : ''}</a>
            </div>

            </div>
  


          </div>

        </div>
      )
    }
  }
}

export default CardInfo;