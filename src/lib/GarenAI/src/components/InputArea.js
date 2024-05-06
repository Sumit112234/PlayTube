// src/components/InputArea.js
import React, { useState } from 'react';

const InputArea = ({ onUserInput }) => {
    const [userText, setUserText] = useState('');

    const handleInputChange = (e) => {
        setUserText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userText.trim()) {
            onUserInput(userText);
            setUserText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='messaging'>
            <div className="AskGarenInputArea">

            <input
                className='messageGarenInput'
                type="text"
                value={userText}
                onChange={handleInputChange}
                placeholder="Type your message..."
                />
            <button type="submit">Send</button>
            </div>
        </form>
    );
};

export default InputArea;
