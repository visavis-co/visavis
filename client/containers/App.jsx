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
  email: store.user.email,
  password: store.user.password,
})

const mapDispatchToProps = dispatch => ({
  userLogin: (email, password) => {
    dispatch(actions.userLogin(email, password));
  },
  enterEmail: (event) => {
    dispatch(actions.enterEmail(event.target.value))
  },
  enterPassword: (event) => {
    dispatch(actions.enterPassword(event.target.value))
  }
})

class App extends Component {

  constructor(props) {
    super(props);
  }

  // add user email and log in to my state
  render() {
    const { userLogin, isLoggedIn, enterEmail, enterPassword, email, password } = this.props;
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => (!isLoggedIn ? <Redirect to="/login" /> : <Home />)}/>

          <Route path="/login" render={() => (isLoggedIn ? <Redirect to="/" /> : <Login userLogin={userLogin} enterEmail={enterEmail} enterPassword={enterPassword} email={email} password={password}/>)}/>

          <Route path="/signup" render={() => (isLoggedIn ? <Redirect to="/" /> : <Signup />)}/>

          <Route path="/match" render={() => (!isLoggedIn ? <Redirect to="/login" /> : <MatchDetails />)} />
        </Switch>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);