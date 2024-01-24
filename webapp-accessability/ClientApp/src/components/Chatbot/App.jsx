import React, { useState, useEffect } from 'react';
import ChatBox from '../Chatbox';
import MessageInput from '../Messageinput';

const App = () => {
  const [messages, setMessages] = useState([]);

  // Long polling function to check for new messages
  const pollMessages = () => {
    // Implement fetching messages from the server here
    // Example: fetch('/api/messages').then(...).then(newMessages => setMessages([...messages, ...newMessages]));

    // Polling every 5 seconds
    setTimeout(pollMessages, 5000);
  };

  useEffect(() => {
    pollMessages();
  }, []);

  const handleSendMessage = (newMessage) => {
    // Implement sending message to the server here
    // Example: fetch('/api/send', { method: 'POST', body: JSON.stringify({ message: newMessage }) });
    
    setMessages([...messages, newMessage]);
  };

  return (
    <div>
      <ChatBox messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;