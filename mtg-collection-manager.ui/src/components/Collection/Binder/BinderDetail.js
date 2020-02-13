import React from 'react';
import { Card } from 'reactstrap';
import binderData from '../../../data/binderData';
import sleeveData from '../../../data/sleeveData';

import './BinderStyle.scss';

class BinderDetail extends React.Component{
  componentDidMount(){
    const binderId = this.props.match.params.binderId;
    binderData.getBinderByBinderId(binderId)
      .then(binderInfo => this.setState({ binderInfo }))
      .catch(err => console.error("error in BinderDetail.js => componentDidMount", err));
    sleeveData.getBinderCards(binderId)
      .then(cardInfo => this.setState({ cardInfo }))
      .catch(err => console.error("error in BinderDetail.js => componentDidMount", err))
  }
  render() {  
    return(
      <div className="BinderDetail page comp">
      
        <Card>
          BinderDetail
        </Card>
      </div>
    )
  }
}

export default BinderDetail;