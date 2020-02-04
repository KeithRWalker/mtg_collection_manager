import React from 'react';
import { CustomInput } from 'reactstrap';
import symbolData from '../../data/symbolData';
import './SearchPage.scss';

class ManaSwitch extends React.Component {
  render() {
    const mana = this.props.mana;

    return(
      <div className="ManaSwitch switch-con">
        <img className="mana-img" src={mana.imgUri} />
        <CustomInput className="color-swicth" type="switch" id={mana.symbolCode} value={mana.symbolCode} />
      </div>
    )
  }
}

export default ManaSwitch;