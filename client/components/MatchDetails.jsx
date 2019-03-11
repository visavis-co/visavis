import React from 'react';
import { Image, Container, Row, Col } from 'react-bootstrap';
// private route
// where the chat ui lives
// where the "check" button and "x" button live, so a user can let us know if they've met their match
// modal pop up asking if matches met in person/online & where

const MatchDetails = props => {
    const assets = '/client/assets/';
    const userPic = assets + props.currentMatch.pictureurl;
    const matchPic = assets + props.userInfo.pictureurl;

    return (
        <div>
            <h1>MATCH DETAILS</h1>
            <Container>
                <Row>
                        <Image src={userPic} height="50%" />
                        <Image src={matchPic} height="50%" />
                </Row>
            </Container>
            <div className="chatbox">
            </div>
        </div>
    );
}

export default MatchDetails;