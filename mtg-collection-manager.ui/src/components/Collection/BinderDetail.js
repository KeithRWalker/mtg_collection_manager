import React from 'react';
import { Card } from 'reactstrap';
import binderData from '../../data/binderData';
import './CollectionPage.scss';

class BinderDetail extends React.Component{
  componentDidMount(){
    const binderId = this.props.match.params.binderId;
    binderData.getBinderByBinderId(binderId)
      .then(binderInfo => this.setState({ binderInfo }))
      .catch(err => console.error("error in BinderDetail.js => componentDidMount", err));
  }
  render() {  
    return(
      <div className="BinderDetail">
        <Card>
          BinderDetail
        </Card>
      </div>
    )
  }
}

export default BinderDetail;