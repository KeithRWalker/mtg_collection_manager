import React from 'react';
import { 
  Button,
  Col,
  Container,
  Form,
  //FormFeedback,
  FormGroup,
  //FormText,
  Input,
  //InputGroup,
  Label,
  Row,
} from 'reactstrap';
import CardContainer from '../CardSingle/CardContainer';
import cardData from '../../data/cardData';


const emptySearch = {
  name: '',
  description: ''
};

class SearchPage extends React.Component {
  state = {
    searchState: emptySearch,
    totalCards: 0,
    hasMore: false,
    cardsReturned: [],
  }

  updateSearchState = (e, formName) => {
    const searchObject = { ...this.state.searchState }
    searchObject[formName] = e.target.value;
    this.setState({ searchState: searchObject })
  }

  nameUpdate = e => this.updateSearchState(e, 'name');
  descriptionUpdate = e => this.updateSearchState(e, 'description');

  submitSearch = (e) => {
    e.preventDefault();
    const searchObject = { ...this.state.searchState };
    const parsedSearchObject = cardData.translateSearch(searchObject);
    cardData.submitSearch(parsedSearchObject)
      .then((resp) => {
        const totalCards = resp.total_cards;
        const hasMore = resp.has_more;
        const cardsReturned = resp.data;
        this.setState({ 
          totalCards,
          hasMore,
          cardsReturned
        })
      })
      .catch(err => console.error("Error in SearchPage.js/submitSearch()", err))
  }

  // printResults = () => {
  //   const { cardsReturned } = this.state;
  //   console.log(cardsReturned)
  // }

  render() {
    const { searchState, totalCards, hasMore, cardsReturned } = this.state;
    return(
      <div className="Search">
        <Container>
          <Form name="searchFormName" onSubmit={this.submitSearch}>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="nameSearch"> Search By Name: </Label>
                    <Input           
                      type="search"
                      name="nameSearch"
                      id="nameSearch"
                      placeholder="Card Name"
                      value={searchState.name}
                      onChange={this.nameUpdate}/>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="descriptionSearch">Search By Description: </Label>
                    <Input 
                      type="search"
                      name="descriptionSearch"
                      id="descriptionSearch"
                      placeholder="Card Description"
                      value={searchState.description}
                      onChange={this.descriptionUpdate}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button type="submit" color="success">Submit</Button>
                </Col>
              </Row>
          </Form>
        </Container>
        <CardContainer
          key="abc"
          totalCards={totalCards}
          hasMore={hasMore}
          cardsReturned={cardsReturned}
        />
        
      </div>
    );
  }
}

export default SearchPage;