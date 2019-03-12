import React from 'react';
import { Image, Button, Container, Row, Jumbotron, Modal } from 'react-bootstrap';
import Chat from './Chat.jsx'

// private route
// where the chat ui lives
// where the "check" button and "x" button live, so a user can let us know if they've met their match
// modal pop up asking if matches met in person/online & where

const MatchDetails = props => {
    const assets = '/client/assets/';
    const userPic = assets + props.currentMatch.pictureurl;
    const matchPic = assets + props.userInfo.pictureurl;
    const matchName = props.currentMatch.fullname;

    return (
        <div className="screenMatchDetails">
            <Jumbotron>
                <h1 padding="1rem">Your match with {matchName}</h1>
                <Container>
                    <Row className="chatmatch">
                        <Image src={matchPic} height="40%" roundedCircle />
                        <Image src={userPic} height="40%" roundedCircle />
                    </Row>
                </Container>
            </Jumbotron>
            <Chat match={props.currentMatch} userId={props.userInfo.id} matchChats={props.matchChats} getMatchChats={props.getMatchChats} />
        </div>
    );
}

export default MatchDetails;