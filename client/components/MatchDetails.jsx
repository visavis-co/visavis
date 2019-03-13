import React from 'react';
import { Image, Button, Container, Row, Jumbotron, Modal } from 'react-bootstrap';
import Chat from './Chat.jsx'

// private route
// where the chat ui lives
// where the "check" button and "x" button live, so a user can let us know if they've met their match
// modal pop up asking if matches met in person/online & where

const MatchDetails = props => {
  const assets = '/client/assets/';
  const matchPic = assets + props.matchToView.picturerl;
  const userPic = assets + props.userInfo.pictureurl;
  const matchName = props.matchToView.fullname;

  return (
    <div className="match-details">
      <div className='match-details-images'>
        <Image src={matchPic} roundedCircle />
        <Image src={userPic} roundedCircle />
      </div>
      <Chat match={props.matchToView} userId={props.userInfo.id} matchChats={props.matchChats} getMatchChats={props.getMatchChats} />
    </div>
  );
}

export default MatchDetails;