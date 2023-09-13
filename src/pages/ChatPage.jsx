import React from 'react'
import { useState, useEffect } from 'react';
// import  wiki from 'wikipedia';
import axios from 'axios';

import {InfoButton,AttachmentButton,ConversationHeader, Avatar, SendButton, MessageList, Message, MessageInput, ChatContainer, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import Header from '../components/Header';
import data from '../devData/data'
import { useLocation, useParams } from 'react-router-dom';


function ChatPage() {
const {id} =   useParams()
var url = "http://ce85-146-148-81-230.ngrok-free.app"

const customHeaders = {
  'ngrok-skip-browser-warning': true
};

const toggleSidebar = (e) => {
  console.log(1);
  console.log(e)
}

  const [messages, setMessages] = useState([
    {
      // message: "Hello, I'm WikiGPT! Choose your title and ask me anything about it!",
      // sentTime: "just now",
      // sender: "WikiGPT"
    }
  ]);
  const [loading, setLoading] = useState(true)

  const [isTyping, setIsTyping] = useState(false);
  
  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);
    // console.log(message)
    setIsTyping(true);
    await processMessage(newMessages);
  };

  async function processMessage(newMessages) { // messages is an array of messages

    var e = ''
    
    axios({
      method: 'get',
      url,
      headers:customHeaders,
      params: {
        query:newMessages[newMessages.length-1].message
      }
    }).then((response) => {
    // console.log({response});
    setMessages([...newMessages, {
      message: response.data,
      sendTime: Date.now(),
      sender: "WikiGPT"
    }]);
    console.log(messages)
      setIsTyping(false)
        }).catch((error) => {
          // if(error.message == "Network Error"){
          //     e = e.message
          // }
          // else{
            e = JSON.stringify(error)
          // }
          setMessages([...newMessages, {
            message: e,
            sender: "WikiGPT"
          }]);
      setIsTyping(false)
      console.log("Error",error.message, error.code, error.config);
    })
  }

  useEffect(()=>{
    setTimeout(setMessages(data), 100000)
    setLoading(false)
    
  }
  , [])

  return (
    <ChatContainer>  

    {/* header */}
    <Header as={ConversationHeader} name={id}/> 
    {/* end of header */}

    {/* message list */}
    <MessageList
      loading = {loading}
      scrollBehavior="smooth" 
      // typingIndicator={isTyping ? <TypingIndicator content="WikiGPT is typing" /> : null}
    >
      {messages.map((message, i) => {
        if (i <5)
        return <Message onClick={toggleSidebar} className='drop_shadow' key={i} model={message}>
          <Message.Footer style={{height:'30px', width:'30px'}} sender="Emily" sentTime="just now" />
        </Message>
      })
      }
    </MessageList>

    {/* message input */}
    <MessageInput placeholder="Ask me a question..." onSend={handleSend} />      


  </ChatContainer>
  )
}

export default ChatPage