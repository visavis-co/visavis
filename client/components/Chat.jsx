import React, { Component } from 'react';
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import ChatMessage from './ChatMessage.jsx';
import io from 'socket.io-client';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = { socket: null }
  }

  componentDidMount(){
    this.props.getMatchChats(this.props.match.id);

    // create socket. request to join match id room
    let socket = io();
    this.setState({socket});
    socket.emit('connect to room', {id: this.props.match.id});

    // checking for # of clients connecting to this match
    socket.on('num clients', (count)=> {
      if (count > 1 && !this.props.matchOnline) {
        this.props.toggleMatchOnline();
      }
    });

    // receiving new messages from the server with userId and message
    socket.on('new msg', (chat) =>{
      // make sure it's not your own message then push to store
      if (this.props.userId !== chat.userId) {
        this.props.addChatMsg(chat.userId, this.props.match.id, chat.message);
      }
    })

    // if someone disconnects and they are online then toggle them offline
    socket.on('someone left', ()=> {
      if (this.props.matchOnline) {
        this.props.toggleMatchOnline();
      }
    });

    // if someone joins and they are offline then toggle them online
    socket.on('someone joined', ()=> {
      if (!this.props.matchOnline) {
        this.props.toggleMatchOnline();
      }
    });
  }

  componentWillUnmount () {
    // disconnect from socket.io
    this.state.socket.close();

    if (this.props.matchOnline) {
      this.props.toggleMatchOnline();
    }
  }

  // add user email and log in to my state
  render() {
    const { chatMessage, chatOnChange  } = this.props;
    const chatMessages = [];
    const chats = this.props.matchChats;

    if (chats.length === 0) chatMessages.push(<div key='nochats'>Say hi and start coordinating your vis-à-vis with {this.props.match.fullname}!</div>)

    for (let i = 0; i < chats.length; i += 1) {
      chatMessages.push(<ChatMessage
        key={i}
        userId={this.props.userId}
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
              <Form id='chat-form'>
                <input type="text" id='chat-msg-input' value={this.props.chatMsg} onChange={this.props.updateChatMsg} />
                <Button type='submit' className="chat-btns" variant="secondary btn-sm" onClick={(e) => { e.preventDefault(); this.props.sendChatMsg(this.props.userId, this.props.match.id, this.props.chatMsg)}}>Submit</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Chat;