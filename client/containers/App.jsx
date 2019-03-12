import React, { Component } from 'react';
import * as actions from "../actions/actions";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import other child components
import Login from '../components/Login.jsx';
import Home from '../components/Home.jsx';
import Header from '../components/Header.jsx';
import MatchDetails from '../components/MatchDetails.jsx';
import Signup from '../components/Signup.jsx';

// user refers to the user controller
const mapStateToProps = (store) => ({
  isLoggedIn: store.user.isLoggedIn,
  userInfo: store.user.userInfo,
  currentMatch: store.user.currentMatch,
  pastMatches: store.user.pastMatches,
  email: store.user.email,
  fullName: store.user.fullName,
  password: store.user.password,
  matchChats: store.user.matchChats,
})

const mapDispatchToProps = dispatch => ({
  userLogin: (email, password) => { dispatch(actions.userLogin(email, password)) },
  userSignup: (fullName, email, password) => { dispatch(actions.userSignup(fullName, email, password)) },
  inSession: () => { dispatch(actions.inSession()) },
  enterEmail: (event) => { dispatch(actions.enterEmail(event.target.value)) },
  enterFullName: (event) => { dispatch(actions.enterFullName(event.target.value)) },
  enterPassword: (event) => { dispatch(actions.enterPassword(event.target.value)) },
  userLogout: (id) => { dispatch(actions.userLogout(id)) } ,
  getMatchChats: (matchId) => { dispatch(actions.getChats(matchId)) },
})

// component did mount => post to login

class App extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){
    console.log('DID MOUNT!');
    this.props.inSession();
  }

  // add user email and log in to my state
  render() {
    const { userLogin, userSignup, userLogout,
      enterEmail, email, matchChats,
      enterPassword, password,
      enterFullName, fullName,
      userInfo, isLoggedIn, currentMatch, pastMatches, getMatchChats } = this.props;

    return (
      <div className="app">
        {isLoggedIn ? <Header userInfo={userInfo} userLogout={userLogout} currentMatch={currentMatch} pastMatches={pastMatches}/> : ''}
        <Router>
          <Switch>
            <Route exact path="/" render={() => (!isLoggedIn ? <Redirect to="/login" />
                        : <Home userInfo={userInfo} userLogout={userLogout} currentMatch={currentMatch} pastMatches={pastMatches} />)}/>

            <Route path="/login" render={() => (isLoggedIn ? <Redirect to="/" />
                        : <Login userLogin={userLogin} enterEmail={enterEmail} enterPassword={enterPassword} email={email} password={password}/>)}/>

            <Route path="/signup" render={() => (isLoggedIn ? <Redirect to="/" />
                        : <Signup userSignup={userSignup} enterFullName={enterFullName} enterEmail={enterEmail} enterPassword={enterPassword}
                                  fullName={fullName} email={email} password={password}/>)}/>

            {/* <Route path="/match" render={() => (!isLoggedIn ? <Redirect to="/login" />
                        : <MatchDetails userInfo={userInfo} userLogout={userLogout} currentMatch={currentMatch} pastMatches={pastMatches} />)} /> */}
            <Route path="/match" render={ () => <MatchDetails userInfo={userInfo} userLogout={userLogout} matchChats={matchChats} currentMatch={currentMatch} pastMatches={pastMatches} getMatchChats={getMatchChats} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);