import React from 'react';
import { Card, CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import './BinderStyle.scss';

class Binder extends React.Component{
  render() {
    const {userBinder} = this.props;
    return(
      <div className="Binder">
        <Card className="user-binder">
          <CardTitle className="binder-title"><Link to={`binder/${userBinder.id}`}>{userBinder.name}</Link></CardTitle>
          <CardSubtitle className="binder-subtitle">{userBinder.description}</CardSubtitle>
        </Card>
      </div>
    )
  }
}

export default Binder;