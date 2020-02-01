import React from 'react';
import { 
  Button,
  Col,
  Collapse,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Row
} from 'reactstrap';
import CardContainer from '../CardSingle/CardContainer';
import searchData from '../../data/searchData';
import AdvSearchForm from './AdvSearchForm';

import './SearchPage.scss';
import NoResults from './NoResults';

const emptySearch = {
  name: '',
  description: ''
};

class SearchPage extends React.Component {
  state = {
    searchState: emptySearch,
    totalCards: 0,
    hasMore: false,
    invalidSearch: false,
    cardsReturned: [],
    advIsOpen: false,
    dropdownOpen: false
  }

  toggle = () => this.setState({ advIsOpen: !this.state.advIsOpen });
  toggleDropdown = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

  nameUpdate = e => this.updateSearchState(e, 'name');
  descriptionUpdate = e => this.updateSearchState(e, 'description');

  updateSearchState = (e, formName) => {
    const searchObject = { ...this.state.searchState }
    searchObject[formName] = e.target.value;
    this.setState({ searchState: searchObject })
  }

  submitSearch = (e) => {
    e.preventDefault();
    const searchObject = { ...this.state.searchState };
    const parsedSearchObject = searchData.translateSearch(searchObject);
    searchData.submitSearch(parsedSearchObject)
      .then((resp) => {
        if(resp === false){
          this.setState({invalidSearch: true})
        }else{
          
          const totalCards = resp.total_cards;
          const hasMore = resp.has_more;
          const cardsReturned = resp.data;
          this.setState({ 
            invalidSearch: false,
            totalCards,
            hasMore,
            cardsReturned,
          })
        }

      })
      .catch(err => console.error("Error in SearchPage.js/submitSearch()", err))
  }

  render() {
    const { searchState, totalCards, hasMore, cardsReturned, advIsOpen, invalidSearch } = this.state;
    let results;
    if(invalidSearch){
      results = <NoResults />
    }else{
      results = <CardContainer
      key="abc"
      totalCards={totalCards}
      hasMore={hasMore}
      cardsReturned={cardsReturned}
      invalidSearch={invalidSearch}
    />
    }

    return(
      <div className="SearchPage">
        <Container>
          <Form name="searchFormName" onSubmit={this.submitSearch}>
            <Row >
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <FormGroup>
                <Label for="nameSearch">
                  <h4>Search By Name:</h4>
                </Label>
                <InputGroup size="lg">
                  <Input
                      type="search"
                      name="nameSearch"
                      id="nameSearch"
                      placeholder="Card Name"
                      value={searchState.name}
                      onChange={this.nameUpdate}/>
                  <InputGroupAddon addonType="append">
                  <Button type="submit" color="success">Search</Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Col>
            </Row>
          </Form>

          <Row>
            <Col>
              <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>
                Advanced Search
              </Button>
            </Col>
          </Row>   

          <Collapse isOpen={advIsOpen}>
            <AdvSearchForm
              key="AdvSearchFormKey"
            />
          </Collapse>
        </Container>

        {results}

        
      </div>
    );
  }
}

export default SearchPage;