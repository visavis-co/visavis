import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// this is bootstrap example from quoc
// this page will be linked to '/login' if user has not yet created a username

const Home = (props) => {
  return (
    <Jumbotron fluid>
      <Container>
        <Row>
          <Col>
            <h1>Visavis</h1>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
}

export default Home;