import React, { Component } from 'react';
import {Container, Row, Col, FormControl } from "react-bootstrap";
import ChatMessage from './ChatMessage.jsx';

class Chat extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.getMatchChats(this.props.match.id);
  }

  // add user email and log in to my state
  render() {
    const { chatMessage, chatOnChange  } = this.props;
    const chatMessages = [];
    const chats = this.props.matchChats;
		console.log('TCL: Chat -> render -> chats', chats)

    for (let i = 0; i < chats.length; i += 1) {

      chatMessages.push(<ChatMessage
        key={i}
        userId={this.props.userId}
        msgFrom={chats[i].fullname}
        msgFromId={chats[i].user_id}
        message={chats[i].message}
        timestamp={chats[i].timestamp}
      />);
    }

    return (
      <Container>
        <Row id='chat-row'>
          <Col id='chat-main' md={8} sm={12}>
            <div id='chat-messages'>
              {chatMessages}
            </div>
            <div>
              <FormControl as="textarea" rows="3" placeholder='' onChange={chatOnChange} id='chatMessage' value={chatMessage} />
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Chat;