import React from 'react';

import {
  Button, 
  CustomInput,
  Form, 
  FormGroup, 
  Label, 
} from 'reactstrap';
import Select from 'react-select';

import catalogData from '../../data/catalogData';
import symbolData from '../../data/symbolData';
import setData from '../../data/setData';

import ManaSwitch from './ManaSwitch';

import './SearchPage.scss'

class AdvSearchForm extends React.Component {
  state={
    creatureTypeOptions: [],
    planeswalkerTypeOptions: [],
    setOptions: [],
    selectedOption: [],
    basicMana: [],
    selectedCreatures: [],
    selectedPlaneswalkers: [],
    selectedSets: []
  }

  componentDidMount(){
    catalogData.getCreatureTypes()
      .then((resp) => {
        const creatureTypeOptions = resp.data;
        this.setState({ creatureTypeOptions })
      }).catch(err => console.error("Error in AdvSearchForm.js / componentDidMount() / creature-type",err));

      catalogData.getPlaneswalkerTypes()
      .then((resp) => {
        const planeswalkerTypeOptions = resp.data;
        this.setState({ planeswalkerTypeOptions })
      }).catch(err => console.error("Error in AdvSearchForm.js / componentDidMount() / planeswalker-type",err));
    
      symbolData.getBasicMana()
      .then((basicMana) => {
        this.setState({ basicMana })
      }).catch(err => console.error("Error in AdvSearchForm.js / componentDidMount() / simple-symbol",err));

    setData.getSetNames()
      .then((setOptions) => {
        this.setState({ setOptions })
      }).catch(err => console.error("Error in AdvSearchForm.js / componentDidMount() / set-names",err));
  }

  handleCreatureChange = selectedCreatures => this.setState({ selectedCreatures });

  handlePlaneswalkerChange = selectedPlaneswalkers => this.setState({ selectedPlaneswalkers });

  handleSetChange = selectedSets => this.setState({ selectedSets })

  typeHandle = (type) => {
    const values = [];
    type.forEach(item => {
      const value = item.value;
      values.push(value);
    });
    return values;
  }

  submitForm = () => {
    //const { selectedCreatures, selectedPlaneswalkers, selectedSets} = this.state;
    // const creatures = this.typeHandle(selectedCreatures);
    // const planeswalkers = this.typeHandle(selectedPlaneswalkers)
    // const sets = this.typeHandle(selectedSets);
    
  };

  

  render(){

    const { creatureTypeOptions, setOptions, planeswalkerTypeOptions } = this.state;

    const creatureEoptions = creatureTypeOptions.map(option =>({ value: option, label: option }))

    const planeswalkerEoptions = planeswalkerTypeOptions.map(option =>({ value: option, label: option }))

    const setEOptions = setOptions.map(option => ({ value: { option }.option.setCode, label: { option }.option.name }))

    const manaChoices = this.state.basicMana.map((x) => (<ManaSwitch mana={x} key={x.symbolCode}/>))


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
                    value={this.selectedCreatures}
                    onChange={this.handleCreatureChange}
                    options={creatureEoptions}
                  />
                </div>
                <Label className="set-label" for="setSelect">Card Set:</Label>
                <div className="multi-select-con">
                  <Select
                    isMulti
                    className="multiselect creature-types"
                    value={this.selectedOption}
                    onChange={this.handleSetChange}
                    options={setEOptions}
                  />
                </div>
                <Label className="set-label" for="setSelect">Planeswalker:</Label>
                <div className="multi-select-con">
                  <Select
                    isMulti
                    className="multiselect Planeswalker-types"
                    value={this.selectedPlaneswalkers}
                    onChange={this.handlePlaneswalkerChange}
                    options={planeswalkerEoptions}
                  />
                </div>
              </FormGroup>
              <Button className="test" onClick={this.submitForm}>Test</Button>
        </Form>
      </div>
    );
  }
}

export default AdvSearchForm;