import React, { Component } from 'react';
import { Button, Container, Form, Row, Col } from "react-bootstrap";
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

    if (chats.length === 0) chatMessages.push(<div>Say hi and start coordinating your vis-à-vis with {this.props.match.fullname}!</div>)

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
            <div id='chat-messages' margin='1rem'>
              {chatMessages}
            </div>
            <div>
              <Form id='chat-input'>
                <input type="text" id='chat-msg-input' value={this.props.chatMsg} onChange={this.props.updateChatMsg} />
                <Button type='submit' className="chat-btns" variant="primary btn-sm" onClick={() => { this.props.sendChatMsg(this.props.userId, this.props.match.id, this.props.chatMsg)}}>Submit</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Chat;