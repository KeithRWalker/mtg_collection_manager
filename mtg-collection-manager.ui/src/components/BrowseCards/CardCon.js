import React from 'react';
import {  Container, Button, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
//import cardData from '../../data/cardData';
import CardSingle from '../CardSingle/CardSingle';



class CardCon extends React.Component {
    
    render() {
        let prevButton;
        const { pageNum, cardArray, nextPage } = this.props;
        const nextPageNum = pageNum + 1;
        const prevPageNum = pageNum - 1;

        const cardsToPrint = cardArray.map(card => (
            <CardSingle key={card.id} magicCard={card} />
        ));

        if(pageNum > 1) {
          prevButton =  <Button onClick={() => {nextPage(prevPageNum)}}>
                          <Link to={`/browse/${prevPageNum}`}> Previous Page </Link>
                        </Button>

        };
        return(
            <div className="CardCon col-sm">
              <div className="page-buttons">
                {prevButton}
                <Button onClick={() => {nextPage(nextPageNum)}}>
                  <Link to={`/browse/${nextPageNum}`}> Next Page </Link>
                </Button>
              </div>
              <Container><Row> {cardsToPrint} </Row></Container>
            </div>
        );
    }
}

export default CardCon;