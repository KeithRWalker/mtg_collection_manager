import React from 'react';

import { Col,
  Row, 
  Button, 
  CustomInput,
  Form, 
  FormGroup, 
  Label, 
  InputGroupAddon
} from 'reactstrap';
import Select from 'react-select';

import catalogData from '../../data/catalogData';
import symbolData from '../../data/symbolData';

import './SearchPage.scss'


class AdvSearchForm extends React.Component {
  state={
    creatureOptions: [],
    selectedOption: []
  }

  componentDidMount(){
    catalogData.getCreatureTypes()
      .then((resp) => {
        const allCreatures = resp.data;
        this.setState({ creatureOptions: allCreatures })
      }).catch(err => console.error("Error in AdvSearchForm.js / componentDidMount() / creature-type",err));
    symbolData.getSimpleSymbolData()
      .then((resp) => {
        resp.forEach(item => {
          if(item.symbol === "{W}"){
            this.setState({ whiteMana: item.svg_uri });
          } else if(item.symbol === "{U}"){
            this.setState({ blueMana: item.svg_uri });
          } else if(item.symbol === "{B}"){
            this.setState({ blackMana: item.svg_uri });
          } else if(item.symbol === "{R}"){
            this.setState({ redMana: item.svg_uri });
          } else if(item.symbol === "{G}"){
            this.setState({ greenMana: item.svg_uri });
          } else if(item.symbol === "{C}"){
            this.setState({ colorlessMana: item.svg_uri });
          }
        });
      }).catch(err => console.error("Error in AdvSearchForm.js / componentDidMount() / simple-symbol",err))
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption }, () => console.log(`Option selected:`, this.state.selectedOption));
  };

  render(){
    const { creatureOptions, whiteMana, blueMana, blackMana, redMana, greenMana, colorlessMana } = this.state;
    const options = creatureOptions.map(option =>(
      { value: option, label: option }
    ))

    return(
      <div className="AdvSearchForm">
        <Form className="adv-search-form">
          <Col form>

            {/* Rarity */}
            <Col md={3}>
              <FormGroup className="rarity-check-group form-g">
              <Label for="rarityCheck">Rarity</Label>
              <CustomInput type="switch" id="commonCheck" label="Common" />
              <CustomInput type="switch" id="uncommonCheck" label="Uncommon" />
              <CustomInput type="switch" id="rareCheck" label="Rare" />
              <CustomInput type="switch" id="mythicCheck" label="Mythic Rare"/>
              </FormGroup>
            </Col>

            


            {/*Card Color */}
            <Col className="mana-col" sm={2} md={2} lg={2}>
            
              <FormGroup className="color-check-group form-g">
              <Label for="colorCheck">Color</Label>
              <Row md={2} className="mx-auto">
                <img className="mana-img" src={whiteMana} />
                <CustomInput type="switch" id="whiteColor" label="White" />
              </Row>
              <Row md={2} className="mx-auto">
                <img className="mana-img" src={blueMana} />
                <CustomInput type="switch" id="blueColor" label="Blue" />
              </Row>
              <Row md={2} className="mx-auto">
                <img className="mana-img" src={blackMana} /> 
                <CustomInput type="switch" id="blackColor" label="Black" />
              </Row>
              <Row md={2} className="mx-auto">
                <img className="mana-img" src={redMana} /> 
                <CustomInput type="switch" id="redColor" label="Red"/>
              </Row>
              <Row md={2} className="mx-auto">
                <img className="mana-img" src={greenMana} /> 
                <CustomInput type="switch" id="greenColor" label="Green" />
              </Row>
              <Row md={2} className="mx-auto">
                <img className="mana-img" src={colorlessMana} /> 
                <CustomInput type="switch" id="colorlessColor" label="Colorless"/>
              </Row>
              </FormGroup>
            </Col>

            {/* Creature Type  */}
            <Col md={4}>
              <FormGroup className="creature-type-group form-g">
                <Label for="creatureType">Creature Type:</Label>
                <Select
                  isMulti
                  className="multiselect creature-types"
                  id=""
                  value={this.selectedOption}
                  onChange={this.handleChange}
                  options={options}
                />
              </FormGroup>
            </Col>
          </Col>
        </Form>
      </div>
    );
  }
}

export default AdvSearchForm;

// <h4>Advanced Search:</h4>
//           <Col>
//             <FormGroup>
//               <Label for="descriptionSearch">
//                 Search By Description:
//               </Label>
//               <Input 
//                 type="search"
//                 name="descriptionSearch"
//                 id="descriptionSearch"
//                 placeholder="Card Description"
//                 value={searchState.description}
//                 onChange={this.descriptionUpdate}/>
//             </FormGroup>
//           </Col>

// <Label for="creatureType"> Creature Type </Label>
// <select value={} onChange={this.handleCreatureClick}>
//   {creatureChecks}
// </select>