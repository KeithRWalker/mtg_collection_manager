import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// FIREBASE
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../auth/firebaseConnection';

// PUBLIC COMPONENTS
import MyNav from '../components/MyNav/MyNav';
import LandingPage from '../components/LandingPage/LandingPage';
import Login from '../components/Login/Login';
import RegisterUser from '../components/RegisterUser/RegisterUser';

// PRIVATE COMPONENTS
import Home from '../components/Home/Home';
// import BrowseCards from '../components/BrowseCards/BrowseCards';
// import CardView from '../components/CardView/CardView';
import SearchPage from '../components/SearchPage/SearchPage';
import CardDetails from '../components/CardDetails/CardDetails';
import DeckCollectionPage from '../components/Collection/Deck/DeckCollectionPage';
import BinderCollectionPage from '../components/Collection/Binder/BinderCollectionPage';
import DeckDetail from '../components/Collection/Deck/DeckDetail';
import BinderDetail from '../components/Collection/Binder/BinderDetail';

//STYLING
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';



firebaseConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component authed={authed} {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/search', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component authed={authed} {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/landingPage', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};


class App extends React.Component {
  state = {
    authed: false,
  }

  logout = () => this.setState({ authed: false });

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    console.error('test');
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
          <Router>
            <MyNav authed={authed} logout={this.logout} />
            
            <Switch>
              <PublicRoute path="/landingPage" component={LandingPage} authed={authed} />
              <PublicRoute path="/login" component={Login} authed={authed} />
              <PublicRoute path="/registerUser" component={RegisterUser} authed={authed} />

              <PrivateRoute path="/home" component={Home} authed={authed} />

              <PrivateRoute path="/search" component={SearchPage} authed={authed} />
              <PrivateRoute path="/card/:cardId" component={CardDetails} authed={authed} />
              <PrivateRoute path="/decks" component={DeckCollectionPage} authed={authed} />
              <PrivateRoute path="/deck/:deckId" component={DeckDetail} authed={authed} />
              <PrivateRoute path="/binders" component={BinderCollectionPage} authed={authed} />
              <PrivateRoute path="/binder/:binderId" component={BinderDetail} authed={authed} />
  
              {/*<PrivateRoute path="/search/:searchText" component={SearchResults} authed={authed} />*/}
            </Switch>

          </Router>
          <div className="bg-img" />
      </div>
    );
  }

}

export default App;
