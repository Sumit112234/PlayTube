// src/components/Message.js
import React from 'react';

const Message = ({ text, isUser }) => {
  
    return (
        <div className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
            {text}
        </div>
    );
};

export default Message;
