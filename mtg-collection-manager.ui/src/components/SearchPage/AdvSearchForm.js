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
import setData from '../../data/setData';

import ManaSwitch from './ManaSwitch';

import './SearchPage.scss'


class AdvSearchForm extends React.Component {
  state={
    creatureOptions: [],
    setOptions: [],
    selectedOption: [],
    basicMana: [],
  }

  componentDidMount(){
    catalogData.getCreatureTypes()
      .then((resp) => {
        const allCreatures = resp.data;
        this.setState({ creatureOptions: allCreatures })
      }).catch(err => console.error("Error in AdvSearchForm.js / componentDidMount() / creature-type",err));
    symbolData.getBasicMana()
      .then((resp) => {
        this.setState({ basicMana: resp })
      }).catch(err => console.error("Error in AdvSearchForm.js / componentDidMount() / simple-symbol",err));
    setData.getSetNames()
      .then((resp) => {
        this.setState({ setOptions: resp })
      }).catch(err => console.error("Error in AdvSearchForm.js / componentDidMount() / set-names",err));
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption }, () => console.log(`Option selected:`, this.state.selectedOption));
  };

  render(){
    const { creatureOptions, setOptions } = this.state;
    const options = creatureOptions.map(option =>(
      { value: option, label: option }
    ))

    // const setNames = setOptions.map(option =>(
    //   { value: option, label: option  }
    // ))

    const manaChoices = this.state.basicMana.map((x) => (
      <ManaSwitch mana={x} key={x.symbolCode}/>
    ))


    return(
      <div className="AdvSearchForm">
        <Form className="adv-search-form">
              {/* Rarity */}
              <FormGroup className="rarity-switch-group form-g">
                <Label className="rarity-label" for="raritySwitch">Rarity</Label>
                  <div className="main-switch-con">
                    <div className="switch-con">
                      <CustomInput className="rarity-switch" type="switch" id="commonCheck" label="Common" />
                    </div>
                    <div className="switch-con">
                      <CustomInput className="rarity-switch" type="switch" id="uncommonCheck" label="Uncommon" />
                    </div>
                    <div className="switch-con">
                      <CustomInput className="rarity-switch" type="switch" id="rareCheck" label="Rare" />
                    </div>
                    <div className="switch-con">
                      <CustomInput className="rarity-switch" type="switch" id="mythicCheck" label="Mythic Rare"/>
                    </div>
                  </div>
              </FormGroup>

              {/*Card Color */}
              <FormGroup className="color-switch-group form-g">
                <Label className="color-label" for="colorSwitch">Color</Label>
                {manaChoices}
              </FormGroup>

            {/* Creature Type  */}
              <FormGroup className="creature-type-group">
                <Label className="creature-label" for="creatureType">Creature Type:</Label>
                <div className="multi-select-con">
                <Select
                  isMulti
                  className="multiselect creature-types"
                  value={this.selectedOption}
                  onChange={this.handleChange}
                  options={options}
                />
                </div>
              </FormGroup>
        </Form>
      </div>
    );
  }
}

export default AdvSearchForm;