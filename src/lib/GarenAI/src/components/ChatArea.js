// src/components/ChatContainer.js
import React, { useState } from 'react';
import Message from './Message';
import InputArea from './InputArea';
import { LuSearch } from "react-icons/lu";

const ChatArea = () => {


    const [messages, setMessages] = useState([]);

    const handleUserInput = (userText) => {
        // Add user message to state
        console.log(messages);
        const updatedMessage = [...messages, { text: userText, isUser: true }];

    // Replace with logic to fetch bot response (e.g., from an API)
    const botResponse = 'Hello! I am your ChatGPT clone.';
    const updatedMessagesWithBotResponse = [...updatedMessage, { text: botResponse, isUser: false }];

    // Update the state with the combined messages
    setMessages(updatedMessagesWithBotResponse);
    };

    return (
        <div id="middleLogo" className='  h-[83vh] py-4'>
          
          <div className="middleImg hidden sm:block absolute opacity-20 top-[14rem] right-[35rem]">
          <img src="GarenLogo.png"  alt="Garen Logo" className="hidden sm:block garen-logo"/>
          </div>
        <div className="chat-container  ">
            <div className="messages-container">

            {messages.map((message, index) => (
                <Message key={index} text={message.text} isUser={message.isUser} />
            ))}
            </div>
            <div className="">
            </div>
        </div>
        
        <div className='hidden sm:block'>

            <InputArea className="hidden sm:block" onUserInput={handleUserInput} />
        </div>

        <form className=" sm:hidden sm:w-1/3 p-3 flex">
        <input type="text" className='py-3 px-4 rounded-l-full w-full ' placeholder='Search for Plants' />
        
        <div className='w-14 h-12'>

            <LuSearch onClick={(e)=>{e.preventDefault();  handleUserInput(e.target.value)}} className='text-sm h-12 p-3 w-12  font-bold hover:bg-gray-400 bg-white  rounded-r-full  border-red-500' />

        </div>

      </form>


        </div>
    );
};

export default ChatArea;
