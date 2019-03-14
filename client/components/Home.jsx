import React from 'react';
import { Button, Image, Container, Row, Col, Jumbotron } from 'react-bootstrap';
import Header from './Header.jsx';
import MatchCard from './MatchCard.jsx';
import { withRouter } from 'react-router-dom'

// private route
// what a user sees when they go to "/" and are logged in
// this month's match is...

// this also works with react-router-native

const Home = props => {
    const matchPic = props.currentMatch.pictureurl;
    const pastMatches = [];
    for (let i = 0; i < props.pastMatches.length; i++) {
      pastMatches.push(<MatchCard setMatchToView={props.setMatchToView} className="image-card" key={i} match={props.pastMatches[i]}/>);
    }

    const MatchButton = withRouter(({ history }) => (
      <Button
        type='button'
        onClick={() => {
          props.setMatchToView(props.currentMatch);
          history.push('/match') }}
      >
        Coordinate with your match
      </Button>
    ))

    let today = new Date().getDay();

    return (
      <div className="home">
          <div id='current-match'>
            {(props.currentMatch.id) ?
              <Row>
                <Col md={6}>
                  <h4>Your current match is...</h4><br/>
                  <h2>{props.currentMatch.fullname}!</h2><br/><br/>
                  <MatchButton />
                </Col>
                <Col md={6}><Image className='pic-current-match' src={matchPic} roundedCircle alt="Current match's profile pic" /></Col>
              </Row>
            :
              <Row>
                <Col>
                  <h4>Your next match is coming in...</h4>
                  <h2>{6-today+2} days!</h2>
                </Col>
              </Row>
            }
          </div>
        <Container className='past-matches-main'>
          <h3>Past Matches</h3>
          <div id='past-match-cards'>
            {pastMatches}
          </div>
        </Container>
      </div>
    );
}

export default Home;