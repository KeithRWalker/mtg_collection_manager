import React from 'react';
import cardData from '../../data/cardData';

class SearchResults extends React.Component {
  state = {
    cardData: []
  }
  componentDidMount(){
    const { searchText } = this.props.match.params;
    cardData.submitSearch(searchText)
      .then((resp) => {
        const matchedCardData = resp.data;
        this.setState({ cardData: matchedCardData  })
      })
      .catch(err => console.error(err))
  }
  render() {
    const { searchText } = this.props.match.params;
    return(
      <div>
        Searching for {searchText}
      </div>
    );
  }
}

export default SearchResults;