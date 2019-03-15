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
import Settings from '../components/Settings.jsx'

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
  chatMsg: store.user.chatMsg,
  socket: store.user.socket,
  matchOnline: store.user.matchOnline,
  passwordOld: store.user.passwordOld,
  loginError: store.user.loginError,
  signupError: store.user.signupError,
  successMessage: store.user.successMessage,
  serverResponse: store.user.serverResponse
})

const mapDispatchToProps = dispatch => ({
  userLogin: (email, password) => { dispatch(actions.userLogin(email, password)) },
  userSignup: (fullName, email, password) => { dispatch(actions.userSignup(fullName, email, password)) },
  enterEmail: (event) => { dispatch(actions.enterEmail(event.target.value)) },
  enterFullName: (event) => { dispatch(actions.enterFullName(event.target.value)) },
  enterPassword: (event) => { dispatch(actions.enterPassword(event.target.value)) },
  enterPasswordOld: (event) => { dispatch(actions.enterPasswordOld(event.target.value))},
  updateChatMsg: (event) => { dispatch(actions.updateChatMsg(event.target.value)) },
  userLogout: (id) => { dispatch(actions.userLogout(id)) } ,
  getMatchChats: (matchId) => { dispatch(actions.getChats(matchId)) },
  changeName: (userInfo, fullName) => { dispatch(actions.changeNameInDb(userInfo, fullName)) },
  toggleMatchModal: () => { dispatch(actions.toggleMatchModal()) },
  setMatchToView: (match) => { dispatch(actions.setMatchToView(match)); },
  updateMatchLocation: (event) => { dispatch(actions.updateMatchLocation(event.target.value)) },
  sendChatMsg: (userId, matchId, chatMsg) => { dispatch(actions.sendChatMsg(userId, matchId, chatMsg)) },
  addChatMsg: (userId, matchId, chatMsg) => { dispatch(actions.addChatMsg(userId, matchId, chatMsg)) },
  completeMatch: (matchId, location, inPerson) => { dispatch(actions.completeMatch(matchId, location, inPerson)) },
  toggleMatchOnline: () => { dispatch(actions.toggleMatchOnline()) },
  handleSelectedFile: (event) => {dispatch(actions.handleSelectedFile(event.target.files[0]))},
  handleUpload: (userInfo) => {dispatch(actions.handleUpload(userInfo))},
  changeEmail: (userInfo, email) => {dispatch(actions.changeEmailInDb(userInfo, email))},
  changePassword: (userInfo, password, passwordOld) => { dispatch(actions.changePasswordInDb(userInfo, password, passwordOld)) }
})

// component did mount => post to login

class App extends Component {

  constructor(props) {
    super(props);
  }

  // add user email and log in to my state
  render() {
    const { userLogin, userSignup, userLogout, updateMatchLocation, matchLocation,
      enterEmail, email, matchChats, setMatchToView, matchToView, addChatMsg,
      enterPassword, password, updateChatMsg, sendChatMsg, completeMatch, toggleMatchOnline,
      enterFullName, fullName, showMatchModal, toggleMatchModal, chatMsg, matchOnline,
      userInfo, isLoggedIn, currentMatch, pastMatches, getMatchChats, changeName,
      handleSelectedFile, handleUpload, changeEmail, passwordOld, enterPasswordOld, changePassword, serverResponse, loginError, signupError } = this.props;


    return (
      <Router>
        <div id='app'>
          {(isLoggedIn) ? <Header userInfo={userInfo} userLogout={userLogout} /> : '' }
          <Route exact path="/" render={() => (!isLoggedIn ? <Redirect to="/login" />
            : <Home userInfo={userInfo} setMatchToView={setMatchToView} currentMatch={currentMatch} pastMatches={pastMatches} />)} />
          <Route path="/login" render={() => (<Login userLogin={userLogin} enterEmail={enterEmail} enterPassword={enterPassword} email={email} password={password} isLoggedIn={isLoggedIn} loginError={loginError}/>)} />
          <Route path="/signup" render={() => (<Signup userSignup={userSignup} enterFullName={enterFullName} enterEmail={enterEmail} enterPassword={enterPassword} fullName={fullName} email={email} password={password} signupError={signupError}/>)} />

          <Route path="/settings" render={ () => (!isLoggedIn ? <Redirect to="/login" />
          : <Settings fullName={fullName} email={email} password={password} userInfo={userInfo} userLogout={userLogout} changeName={changeName}
           enterFullName={enterFullName} enterEmail={enterEmail} changeEmail={changeEmail} handleSelectedFile={handleSelectedFile} handleUpload={handleUpload}
           passwordOld={passwordOld} enterPassword={enterPassword} enterPasswordOld={enterPasswordOld} changePassword={changePassword} successMessage={successMessage} serverResponse={serverResponse} />)} />

          <Route path="/match" render={() => (!isLoggedIn ? <Redirect to="/login" />
            : <MatchDetails
                showMatchModal={showMatchModal} toggleMatchModal={toggleMatchModal}
                matchChats={matchChats} getMatchChats={getMatchChats} matchOnline={matchOnline}
                completeMatch={completeMatch} chatMsg={chatMsg} addChatMsg={addChatMsg}
                updateChatMsg={updateChatMsg} sendChatMsg={sendChatMsg}
                updateMatchLocation={updateMatchLocation} matchLocation={matchLocation}
                userInfo={userInfo} matchToView={matchToView} toggleMatchOnline={toggleMatchOnline} />)} />
        </div>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);