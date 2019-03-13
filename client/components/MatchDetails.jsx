import React from 'react';
import { Image, Button, Modal } from 'react-bootstrap';
import Chat from './Chat.jsx';
import {Redirect} from 'react-router-dom';

// private route
// where the chat ui lives
// where the "check" button and "x" button live, so a user can let us know if they've met their match
// modal pop up asking if matches met in person/online & where

const MatchDetails = props => {
  const assets = '/client/assets/';
  const matchPic = assets + props.matchToView.pictureurl;
  const userPic = assets + props.userInfo.pictureurl;

  if (!props.matchToView.id) return <Redirect to="/" />

  return (
    <div className="match-details">
      <div className='match-details-images'>
        <Image src={userPic} roundedCircle />
        <Image src={matchPic} roundedCircle />
      </div>
      <Chat
        match={props.matchToView} userId={props.userInfo.id} matchChats={props.matchChats}
        getMatchChats={props.getMatchChats} chatMsg={props.chatMsg} sendChatMsg={props.sendChatMsg}
        updateChatMsg={props.updateChatMsg}
      />

      <Button id='complete-match-button' variant="success" onClick={props.toggleMatchModal}> Completed Match! </Button>

      <Modal show={props.showMatchModal} onHide={props.toggleMatchModal}>
        <Modal.Header closeButton>
          <Modal.Title>Where / how did you meet with {props.matchToView.fullname}? </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" id='match-loc-input' placeholder='Starbucks, Skype, etc...' value={props.matchLocation} onChange={props.updateMatchLocation} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {props.completeMatch(props.matchToView.id, props.matchLocation, true)}}> Met in Person</Button>
          <Button variant="primary" onClick={() => {props.completeMatch(props.matchToView.id, props.matchLocation, false)}}> Met Online </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MatchDetails;