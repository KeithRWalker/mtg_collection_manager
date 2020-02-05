import React from 'react';
import { Card, CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import './CollectionPage.scss';

class Binder extends React.Component{
  render() {
    const {userBinder} = this.props;
    return(
      <div className="Binder">
        <Card>
          <CardTitle><Link to={`binder/${userBinder.id}`}>{userBinder.name}</Link></CardTitle>
          <CardSubtitle>{userBinder.description}</CardSubtitle>
        </Card>
      </div>
    )
  }
}

export default Binder;