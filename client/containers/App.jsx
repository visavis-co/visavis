import React, { Component } from 'react';
import * as actions from "../actions/actions";
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
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
  matchToView: store.user.matchToView,
  showMatchModal: store.user.showMatchModal,
  matchLocation: store.user.matchLocation,
})

const mapDispatchToProps = dispatch => ({
  userLogin: (email, password) => { dispatch(actions.userLogin(email, password)) },
  userSignup: (fullName, email, password) => { dispatch(actions.userSignup(fullName, email, password)) },
  enterEmail: (event) => { dispatch(actions.enterEmail(event.target.value)) },
  enterFullName: (event) => { dispatch(actions.enterFullName(event.target.value)) },
  enterPassword: (event) => { dispatch(actions.enterPassword(event.target.value)) },
  userLogout: (id) => { dispatch(actions.userLogout(id)) } ,
  getMatchChats: (matchId) => { dispatch(actions.getChats(matchId)) },
  toggleMatchModal: () => { dispatch(actions.toggleMatchModal()) },
  setMatchToView: (match) => { dispatch(actions.setMatchToView(match)) },
  updateMatchLocation: (event) => { dispatch(actions.updateMatchLocation(event.target.value)) },
  completeMatch: (matchId, location, inPerson) => {
    console.log('completematch in app.jsx - ', matchId, location, inPerson)
    dispatch(actions.completeMatch(matchId, location, inPerson)) },
})

// component did mount => post to login

class App extends Component {

  constructor(props) {
    super(props);
  }

  // add user email and log in to my state
  render() {
    const { userLogin, userSignup, userLogout, updateMatchLocation, matchLocation,
      enterEmail, email, matchChats, setMatchToView, matchToView,
      enterPassword, password, updateChatMsg, sendChatMsg, completeMatch,
      enterFullName, fullName, showMatchModal, toggleMatchModal,
      userInfo, isLoggedIn, currentMatch, pastMatches, getMatchChats } = this.props;

    return (
      <Router>
        <div id='app'>
          {(isLoggedIn) ? <Header userInfo={userInfo} userLogout={userLogout} /> : '' }
          <Route exact path="/" render={() => (!isLoggedIn ? <Redirect to="/login" />
            : <Home userInfo={userInfo} userLogout={userLogout} setMatchToView={setMatchToView} currentMatch={currentMatch} pastMatches={pastMatches} />)} />
          <Route path="/login" render={() => (<Login userLogin={userLogin} enterEmail={enterEmail} enterPassword={enterPassword} email={email} password={password} isLoggedIn={isLoggedIn} />)} />
          <Route path="/signup" render={() => (<Signup userSignup={userSignup} enterFullName={enterFullName} enterEmail={enterEmail} enterPassword={enterPassword} fullName={fullName} email={email} password={password} />)} />
          <Route path="/match" render={() => (!isLoggedIn ? <Redirect to="/login" />
            : <MatchDetails
                showMatchModal={showMatchModal} toggleMatchModal={toggleMatchModal}
                matchChats={matchChats} getMatchChats={getMatchChats}
                completeMatch={completeMatch}
                updateChatMsg={updateChatMsg} sendChatMsg={sendChatMsg}
                updateMatchLocation={updateMatchLocation} matchLocation={matchLocation}
                userInfo={userInfo} matchToView={matchToView} />)} />
        </div>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);