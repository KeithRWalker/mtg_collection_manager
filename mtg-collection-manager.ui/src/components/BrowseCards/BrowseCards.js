import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import cardData from '../../data/cardData';
import CardCon from '../CardCon/CardCon';

import './BrowseCards.scss';

const defaultPage = 1;
class BrowseCards extends React.Component {
  state = {
    pageNum: defaultPage,
    nextPage: Number,
    cardArray: []
  }

  fetchCardData = () => {
    const { pageNum } = this.state
    cardData.getPage(pageNum)
      .then(resp => this.setState({ cardArray: resp.data }))
      .catch(err => console.error("error in fetchCardData BrowseCards.js", err))
  }

  nextPage = (nextPageNum) => {
    this.setState({pageNum: nextPageNum}, () => {
      this.fetchCardData();
    });
  }

  componentDidMount() {
    const { pageNum } = this.state
    cardData.getPage(pageNum)
      .then(resp => this.setState({ cardArray: resp.data }))
      .catch(err => console.error("error in CDM BrowseCards.js", err))
  }
    
  render() {
    const { pageNum, cardArray } = this.state;

    return(
      <div className="BrowseCards">
        <h1>Page {pageNum}</h1>
        <CardCon 
          key={"page"+pageNum}
          cardArray={cardArray}
          pageNum={pageNum}
          nextPage={this.nextPage}
          fetchCardData={this.fetchCardData}
        />

      </div>
    );
  }
}

export default BrowseCards;