import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Home from '../components/Home/Home';
import MyNav from '../components/MyNav/MyNav';
import RegisterUser from '../components/RegisterUser/RegisterUser';
import CardView from '../components/CardView/CardView';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component authed={authed} {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component authed={authed} {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <Router>
          <MyNav />
          <Switch>
            <PublicRoute path="/home" component={Home} authed={authed} />
            <PublicRoute path="/registerUser" component={RegisterUser} authed={authed} />
            <PrivateRoute path="/cardView" component={CardView} authed={authed} />
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App;
