// src/components/chat/UserChat.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socket = io('https://loompanics-backend.vercel.app/');

const UserChat = () => {
    const userId = useSelector((state) => state.auth.userId);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.emit('joinRoom', userId);

    socket.on('receiveMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [userId]);

  const handleSendMessage = () => {
    const newMessage = { room: userId, content: message, sender: 'user' };
    socket.emit('sendMessage', newMessage);
    setMessage('');
  };

  return (
    <div>
      <h2>Chat with Admin</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.content}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default UserChat;
