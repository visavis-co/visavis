import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Home = (props) => {
  return (
    <Jumbotron fluid>
      <Container>
        <Row>
          <Col>
            <h2>My App's Home</h2>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
}

export default Home;