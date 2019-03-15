import React from 'react';
import { Image, Button, Modal, Row, Col } from 'react-bootstrap';
import Chat from './Chat.jsx';
import {Redirect} from 'react-router-dom';

// private route
// where the chat ui lives
// where the "check" button and "x" button live, so a user can let us know if they've met their match
// modal pop up asking if matches met in person/online & where

const MatchDetails = props => {
  const assets = '/client/assets/';
  const matchPic = props.matchToView.pictureurl;

  // redirect to homepage after closing out the match
  if (!props.matchToView.id) return <Redirect to="/" />

  // today's day of the week to calculate match times
  let today = new Date().getDay();


  return (
    <div className="match-details">
      <div id='current-match'>
        <Row>
          <Col md={6}>
            {(props.matchToView.dateCompleted) ?
              // this is completed event.
              <div>
                <h3>You and {props.matchToView.fullname} met up {(props.matchToView.inperson) ? 'at' : 'on'} {props.matchToView.location} on {new Date(props.matchToView.dateCompleted).toDateString()}</h3><br/>
                <h4>You have another match coming in {6-today+2} days!</h4>
              </div>
            :
              <div>
                {/* this is the current event */}
                <h4>You have {6-today+1} days left for your match with {props.matchToView.fullname}! Don't leave them hanging and plan your <em>vis-à-vis</em> below.</h4><br/>
                <Button id='complete-match-button' variant="success" onClick={props.toggleMatchModal}> Complete this Match! </Button>
              </div>
            }
          </Col>
          <Col md={6}>
            <Image className='pic-current-match' src={matchPic} roundedCircle alt="Current match's profile pic" /><br/>
            {(props.matchOnline) ? <span id='match-online-txt'>[{props.matchToView.fullname} is online]</span> : ''}
          </Col>
        </Row>
      </div>
      <Chat
        match={props.matchToView} userId={props.userInfo.id} matchChats={props.matchChats}
        getMatchChats={props.getMatchChats} chatMsg={props.chatMsg} sendChatMsg={props.sendChatMsg} matchOnline={props.matchOnline}
        updateChatMsg={props.updateChatMsg} addChatMsg={props.addChatMsg} toggleMatchOnline={props.toggleMatchOnline}
      />


      <Modal show={props.showMatchModal} onHide={props.toggleMatchModal}>
        <Modal.Header closeButton>
          <Modal.Title>Where / how did you meet with {props.matchToView.fullname}? </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" id='match-loc-input' placeholder='Starbucks, Skype, etc...' value={props.matchLocation} onChange={props.updateMatchLocation} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {props.completeMatch(props.matchToView.id, props.matchLocation, true)}}> Met in Person</Button>
          <Button variant="secondary" onClick={() => {props.completeMatch(props.matchToView.id, props.matchLocation, false)}}> Met Online </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MatchDetails;