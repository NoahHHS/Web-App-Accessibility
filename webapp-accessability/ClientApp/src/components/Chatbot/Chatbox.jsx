import React from 'react';

const ChatBox = ({ messages }) => (
  <div>
    {messages.map((msg, index) => (
      <div key={index}>{msg}</div>
    ))}
  </div>
);

export default ChatBox;
