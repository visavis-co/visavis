import React from 'react';
import { Card } from 'react-bootstrap';

const MatchCard = props => {
    const assets = '/client/assets/';
    return (
      <Card className='match-card'>
        <Card.Img variant="top" src={assets + props.match.pictureurl} />
        <Card.Body>
          <Card.Title>{props.match.fullname}</Card.Title>
          <Card.Text>
            Met {(props.match.inperson) ? 'at' : 'on'} {props.match.location} on {new Date(props.match.dateCompleted).toDateString()}
          </Card.Text>
        </Card.Body>
      </Card>
    );
}

export default MatchCard;