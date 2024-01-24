import React, { useState } from 'react';
import '../../stylesheets/chat.css';

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [lastBotResponse, setLastBotResponse] = useState('');

  const chatbotResponses = [
    'Bedankt voor je bericht! We zullen spoedig contact met je opnemen.',
    'Ik ben hier om je te helpen. Wat kan ik voor je doen?',
    'Sorry, ik begreep je bericht niet helemaal. Kun je dat misschien anders formuleren?',
    'We waarderen je contact. Een teamlid zal spoedig reageren.'
  ];

  const getRandomBotResponse = () => {
    // Kies een willekeurig antwoord dat niet overeenkomt met het laatste antwoord
    let randomResponse = '';
    do {
      randomResponse = chatbotResponses[Math.floor(Math.random() * chatbotResponses.length)];
    } while (randomResponse === lastBotResponse);
    setLastBotResponse(randomResponse);
    return randomResponse;
  };

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'user', message: inputMessage }
      ]);

      setInputMessage('');

      // Kies een willekeurig antwoord dat niet overeenkomt met het laatste antwoord
      const response = getRandomBotResponse();

      // Voeg het chatbot-antwoord toe aan de berichten
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'chatbot', message: response }
      ]);
    }
  };

  const sendEmail = () => {
    // Simuleer een e-mailaanroep naar de server
    fetch('http://localhost:3001/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: 'ontvanger@example.com',
        subject: 'Onderwerp van de e-mail',
        text: 'Inhoud van de e-mail'
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert('E-mail verzonden!');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Er is een fout opgetreden bij het verzenden van de e-mail.');
      });
  };

  const downloadChat = () => {
    const chatContent = messages.map(chat => `${chat.sender}: ${chat.message}`).join('\n');
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-gesprek.txt';
    a.click();

    URL.revokeObjectURL(url);
  };

  const clearChat = () => {
    setMessages([]);
    setLastBotResponse('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className='chat-container'>
      <div className="chat-box">
        {messages.map((chat, index) => (
          <div key={index} className={chat.sender}>
            {chat.message}
          </div>
        ))}
      </div>
      <div className='inputfield'>
        <input
          className='message'
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Typ hier je bericht"
        />
        <div className='buttons'>
          <button className='send' onClick={sendMessage}>Verstuur</button>
          <button className='sendemail' onClick={sendEmail}>Stuur e-mail van de chat</button>
          <button className='download' onClick={downloadChat}>Download gesprek</button>
          <button className='clear' onClick={clearChat}>Chat wissen</button>
        </div>
      </div>
    </div>
  );
}