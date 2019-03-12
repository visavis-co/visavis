import React from 'react';

// userId = { this.props.userId }
// msgFrom = { chats[i].fullname }
// msgFromId = { chats[i].user_id }
// message = { chats[i].message }
// timestamp = { chats[i].timestamp }

const ChatMessage = props => {
  return (
    <div className={(props.userId === props.msgFromId) ? 'chat-msg-me' : 'chat-msg-you'}>
      <div>
        {props.message}
      </div>
    </div>
  );
}

export default ChatMessage;