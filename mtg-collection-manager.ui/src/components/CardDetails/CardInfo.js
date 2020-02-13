import React from 'react'
import { Collapse, Fade } from 'reactstrap';
import { MDBBtn, MDBListGroup, MDBListGroupItem } from "mdbreact";
import AddButton from '../CardSingle/AddButton';
import symbolData from '../../data/symbolData';
import cardData from '../../data/cardData';
import deckData from '../../data/deckData';
import './CardDetails.scss';
class CardInfo extends React.Component{

  state = {
    cardManaCost: [],
    faceAManaCost: [],
    faceBManaCost: [],
    faceOpen: true,
    userDecks: []
  }

  toggleFace = () => this.setState({ faceOpen: !this.state.faceOpen })

  getUserDecks = () => {
      deckData.getUserDecks()
        .then((resp) => {
          resp.forEach((deck) => {
            const { id, name } = deck
            const deckInfo = {
              id: id,
              name: name
            };
            this.state.userDecks.push(deckInfo);
          })
        })
  }


  addToDeck = (e) => {
      const collectionValue = e.target.value
      const scryId = this.props.cardInfo.scryId;
      const additionInfo = {
        scryId: scryId,
        collectionId: collectionValue,
        collectionType: "deck"
      }
      cardData.addCardToUser(additionInfo)
  }

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

  componentDidMount(){
    this.checkMana();
    this.getUserDecks();
    if(this.props.cardItem.cardFaces < 0){
      this.checkRegImg();
    }
  }

  render() {
    const userDecks = this.state.userDecks;
    const cardItem = this.props.cardItem;
    const legalities = cardItem.legalities;
    const addToDeck = <AddButton collection={userDecks} type="Deck" scryId={cardItem.scryId} key={`add_btn_key_${cardItem.id}`} />

    const legality = Object.entries(legalities).map(function (entry) {
      const gameName = entry[0].replace(/^\w/, c => c.toUpperCase());
      if(entry[1] === "legal"){
        return <div className="legal-con" key={`key_${gameName}_${entry[1]}_${cardItem.Id}_div`}><dt className="game-name-dt" key={`key_${gameName}_${entry[1]}_${cardItem.Id}_dt`}>{gameName}</dt> <dd className="is-legal dd-legality" key={`key_${gameName}_${entry[1]}_${cardItem.Id}_dd`}>Legal</dd></div>
      }
        return <div className="legal-con" key={`key_${gameName}_${entry[1]}_${cardItem.Id}_div`}><dt className="game-name-dt" key={`key_${gameName}_${entry[1]}_${cardItem.Id}_dt`}>{gameName}</dt> <dd className="is-not-legal dd-legality" key={`key_${gameName}_${entry[1]}_${cardItem.Id}_dd`}>Not Legal</dd></div>
    })

    
    if(cardItem.cardFaces.length > 0){
      const cardFaceA = cardItem.cardFaces[0]
      const cardFaceB = cardItem.cardFaces[1]
      let cardImgs;

      if(cardFaceA.cardFaceImageUris == null || cardFaceB.cardFaceImageUris == null){
        cardImgs = <div className="card-info-image-con" onClick={this.toggleFace}><img className="card-info-img" src={cardItem.imageUris.large} alt={cardItem.name ? cardItem.name : "magic card"}/></div>
      }
      else{
        cardImgs = <div className="img-td" onClick={this.toggleFace}>
                      <Fade in={this.state.faceOpen}>
                        <Collapse isOpen={this.state.faceOpen}>
                          <img className="card-info-img" src={cardFaceA.cardFaceImageUris.large} alt={`${cardFaceA.name ? cardFaceA.name : 'magic card'}`}/>
                        </Collapse>
                      </Fade>
                      <Fade in={!this.state.faceAOpen}>
                        <Collapse isOpen={!this.state.faceOpen}>
                          <img className="card-info-img" src={cardFaceB.cardFaceImageUris.large} alt={`${cardFaceB.name ? cardFaceB.name : 'magic card'}`}/>
                        </Collapse>
                      </Fade>
                    </div>
      }

      const faceAManaImgs = this.state.faceAManaCost.map((uri, index) => (
        <img key={`${uri}_${index}`} src={uri} className="info-mana-img" alt="mana-symbol" />
      ))
      const faceBManaImgs = this.state.faceBManaCost.map((uri, index) => (
        <img key={`${uri}_${index}`} src={uri} className="info-mana-img" alt="mana-symbol" />
      ))






      return(
        <div className="CardInfo">


            <div className="card-play-info-con">
              <div onClick={this.toggleFace} className="card-con">

              <div className="card-info-img-con">
                {cardImgs}
              </div>

                <Collapse isOpen={this.state.faceOpen}>
                  <div className="side-of-card">

                    <div className="card-play-info-con">
                      <h3>{cardFaceA.name}</h3>
                      <div className="info-oracle-txt"><p>{cardFaceA.oracleText}</p></div>
                    </div>

                    <div className="misc-con">
                      <h6>{cardFaceA.typeLine}</h6>
                      <div className="stats">
                        <h6> {cardFaceA.power ? `Power: ${cardFaceA.power}` : ''}</h6>
                        <h6>{cardFaceA.toughness ? `Toughness: ${cardFaceA.toughness}` : ''}</h6>
                        <h6> {cardFaceA.loyalty ? `Loyalty: ${cardFaceA.loyalty}` : ''}</h6>
                        <h6> {cardFaceA.artist ? `Artist: ${cardFaceA.artist}` : ''}</h6>
                        <h6>  {cardItem.rarity ? `Rarity: ${cardItem.rarity}` : ''}</h6>
                        <div className="mana-imgs">{faceAManaImgs}</div>
                      </div>
                    </div>

                    <div className="legality-con">
                      <h6>Legalities</h6>
                      <dl className="legality-dl"> {legality} </dl>
                    </div>
                  </div>
                </Collapse>


                <Collapse isOpen={!this.state.faceOpen}>
                  <div className="side-of-card">

                    <div className="card-play-info-con">
                      <h3>{cardFaceB.name}</h3>
                      <div className="info-oracle-txt"><p>{cardFaceB.oracleText}</p></div>
                    </div>
    
                      <div className="misc-con">
                        <h6>{cardFaceB.typeLine}</h6>
                        <div className="stats">
                          <h6> {cardFaceB.power ? `Power: ${cardFaceB.power}` : ''}</h6>
                          <h6>{cardFaceB.toughness ? `Toughness: ${cardFaceB.toughness}` : ''}</h6>
                          <h6> {cardFaceB.loyalty ? `Loyalty: ${cardFaceB.loyalty}` : ''}</h6>
                          <h6> {cardFaceB.artist ? `Artist: ${cardFaceB.artist}` : ''}</h6>
                          <h6>  {cardItem.rarity ? `Rarity: ${cardItem.rarity}` : ''}</h6>
                          <div className="mana-imgs">{faceBManaImgs}</div>
                      </div> 
                      
                      <div className="legality-con">
                        <h6>Legalities</h6>
                        <dl className="legality-dl"> {legality} </dl>
                      </div>
                    </div>
                  </div>
                </Collapse>

              </div>
            </div>


            <div className="under-card">
                <div className="prices">
                <MDBListGroup>
                  <h5 className="price-head">Prices:</h5>
                  <MDBListGroupItem color="success">USD: {cardItem.prices.usd ? cardItem.prices.usd : 'Not Available'}</MDBListGroupItem>
                  <MDBListGroupItem color="success">USD/Foil: {cardItem.prices.usdFoil ? cardItem.prices.usdFoil : 'Not Available'}</MDBListGroupItem>
                  <MDBListGroupItem color="success">EUR: {cardItem.prices.eur ? cardItem.prices.eur : 'Not Available'}</MDBListGroupItem>
                  <MDBListGroupItem color="success">TIX: {cardItem.prices.tix ? cardItem.prices.tix : 'Not Available'}</MDBListGroupItem>
                </MDBListGroup>
                </div>
  
                <div className="purchases">
                  <h5 className="purchase-head">Purchase</h5>
                  <MDBBtn rounded color="success" className="external-link" target="_blank" href={cardItem.purchaseUris.cardhoarder ? cardItem.purchaseUris.cardhoarder : ''}>{cardItem.purchaseUris.cardhoarder ? 'Buy On Cardhoarder' : ''}</MDBBtn>
                  <MDBBtn rounded color="success" className="external-link" target="_blank" href={cardItem.purchaseUris.cardmarket ? cardItem.purchaseUris.cardmarket : ''}>{cardItem.purchaseUris.cardmarket ? 'Buy On Cardmarket' : ''}</MDBBtn>
                  <MDBBtn rounded color="success" className="external-link" target="_blank" href={cardItem.purchaseUris.tcgplayer ? cardItem.purchaseUris.tcgplayer : ''}>{cardItem.purchaseUris.tcgplayer ? 'Buy On TCGPlayer' : ''} </MDBBtn>
                </div>
              
            
            <div className="external-links">
            <h5 className="link-head">External Links</h5>
              <MDBBtn rounded color="info" className="external-link" target="_blank" href={cardItem.relatedUris.edhrec ? cardItem.relatedUris.edhrec : ''}> {cardItem.relatedUris.edhrec ? 'Card Analysis on EDHREC' : ''}</MDBBtn>
              <MDBBtn rounded color="info" className="external-link" target="_blank" href={cardItem.relatedUris.gatherer ? cardItem.relatedUris.gatherer : ''}> {cardItem.relatedUris.gatherer ? 'View On Gatherer' : ''}</MDBBtn>
              <MDBBtn rounded color="info" className="external-link" target="_blank" href={cardItem.relatedUris.mtgtop8 ? cardItem.relatedUris.mtgtop8 : ''}> {cardItem.relatedUris.mtgtop8 ? 'Search MTGTop8 for this card' : ''}</MDBBtn>
              <MDBBtn rounded color="info" className="external-link" target="_blank" href={cardItem.relatedUris.tcgplayerDecks ? cardItem.relatedUris.tcgplayerDecks : ''}> {cardItem.relatedUris.tcgplayerDecks ? 'TCGplayer decks with this card' : ''}</MDBBtn>
            </div>
            {addToDeck}
          </div>
          
        </div>
      )
    }
    else{
      return(
        <div className="CardInfo">


          <div className="card-con">
              <div className="card-info-img-con">
                <img className="card-info-img" src={cardItem.imageUris.large} alt={cardItem.name ? cardItem.name : 'Magic card'}/>
              </div>
                  <div className="side-of-card">
                      <div className="card-play-info-con">
                        <h4>{cardItem.name ? cardItem.name : ''}</h4>
                        <p>{cardItem.oracleText ? cardItem.oracleText : ''}</p>
                      </div>
                      <div className="misc-con">
                        <h5>{cardItem.typeLine ? cardItem.typeLine : ''}</h5>
                        <div className="stats">
                          <h6> {cardItem.power ? `Power: ${cardItem.power}` : ''}</h6>
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

            <div className="prices">
              <MDBListGroup>
                <h5 className="price-head">Prices:</h5>
                <MDBListGroupItem className="prices">USD: {cardItem.prices.usd ? cardItem.prices.usd : 'Not Available'}</MDBListGroupItem>
                <MDBListGroupItem className="prices">USD/Foil: {cardItem.prices.usdFoil ? cardItem.prices.usdFoil : 'Not Available'}</MDBListGroupItem>
                <MDBListGroupItem className="prices">EUR: {cardItem.prices.eur ? cardItem.prices.eur : 'Not Available'}</MDBListGroupItem>
                <MDBListGroupItem className="prices">TIX: {cardItem.prices.tix ? cardItem.prices.tix : 'Not Available'}</MDBListGroupItem>
              </MDBListGroup>
            </div>

            <div className="purchases">
              <h5 className="purchase-head">Purchase</h5>
              <MDBBtn rounded className="external-link" target="_blank" href={cardItem.purchaseUris.cardhoarder ? cardItem.purchaseUris.cardhoarder : ''}>{cardItem.purchaseUris.cardhoarder ? 'Buy On Cardhoarder' : ''}</MDBBtn>
              <MDBBtn rounded className="external-link" target="_blank" href={cardItem.purchaseUris.cardmarket ? cardItem.purchaseUris.cardmarket : ''}>{cardItem.purchaseUris.cardmarket ? 'Buy On Cardmarket' : ''}</MDBBtn>
              <MDBBtn rounded className="external-link" target="_blank" href={cardItem.purchaseUris.tcgplayer ? cardItem.purchaseUris.tcgplayer : ''}>{cardItem.purchaseUris.tcgplayer ? 'Buy On TCGPlayer' : ''} </MDBBtn>
            </div>
        
      
            <div className="external-links">
              <h5 className="link-head">External Links</h5>
              <MDBBtn rounded className="external-link" target="_blank" href={cardItem.relatedUris.edhrec ? cardItem.relatedUris.edhrec : ''}> {cardItem.relatedUris.edhrec ? 'Card Analysis on EDHREC' : ''}</MDBBtn>
              <MDBBtn rounded className="external-link" target="_blank" href={cardItem.relatedUris.gatherer ? cardItem.relatedUris.gatherer : ''}> {cardItem.relatedUris.gatherer ? 'View On Gatherer' : ''}</MDBBtn>
              <MDBBtn rounded className="external-link" target="_blank" href={cardItem.relatedUris.mtgtop8 ? cardItem.relatedUris.mtgtop8 : ''}> {cardItem.relatedUris.mtgtop8 ? 'Search MTGTop8 for this card' : ''}</MDBBtn>
              <MDBBtn rounded className="external-link" target="_blank" href={cardItem.relatedUris.tcgplayerDecks ? cardItem.relatedUris.tcgplayerDecks : ''}> {cardItem.relatedUris.tcgplayerDecks ? 'TCGplayer decks with this card' : ''}</MDBBtn>
            </div>
            {addToDeck}
          </div>

        </div>
      )
    }
  }
}

export default CardInfo;