import React from 'react';
import { Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'

const MatchCard = (props, context) => {
    const assets = '/client/assets/';

    const ClickDiv = withRouter(({ history }) => (
      <div
        onClick={() => {
          props.setMatchToView(props.match);
          history.push('/match') }}
      >
        <Card className='match-card'>
          <Card.Img variant="top" src={assets + props.match.pictureurl} />
          <Card.Body>
            <Card.Title>{props.match.fullname}</Card.Title>
            <Card.Text>
              Met {(props.match.inperson) ? 'at' : 'on'} {props.match.location} on {new Date(props.match.dateCompleted).toDateString()}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    ))

    return (
      <ClickDiv />
    );
}

export default MatchCard;