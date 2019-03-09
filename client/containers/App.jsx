import React, { Component } from 'react';
import * as actions from "../actions/actions";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import other child components
import Login from '../components/Login.jsx';
import Home from '../components/Home.jsx';
import MatchDetails from '../components/MatchDetails.jsx';
import Signup from '../components/Signup.jsx';

const mapStateToProps = (store) => ({
  isLoggedIn: store.user.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
  // after logged in, should render to show home page with current and past matches 
  logIn: () => {
    dispatch(actions.logIn());
  },
})

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { logIn, isLoggedIn } = this.props;
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => (!isLoggedIn ? <Redirect to="/login" /> : <Home home={this.props} />)}/>

          <Route path="/login" render={() => (isLoggedIn ? <Redirect to="/" /> : <Login logIn={logIn} isLoggedIn={isLoggedIn} />)}/>

          <Route path="/signup" render={() => (isLoggedIn ? <Redirect to="/" /> : <Signup />)}/>

          <Route path="/match" render={() => (!isLoggedIn ? <Redirect to="/login" /> : <MatchDetails />)} />
        </Switch>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);