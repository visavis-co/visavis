import React from 'react';

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