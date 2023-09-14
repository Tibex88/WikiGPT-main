import React from 'react'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// import  wiki from 'wikipedia';
import axios from 'axios';

//store
import useErrorStore from '../store/Error';

//components
import {ConversationHeader, MessageList, Message, MessageInput, ChatContainer, TypingIndicator, Sidebar } from '@chatscope/chat-ui-kit-react';
import Header from '../components/Header';

import data from '../devData/data'
import { useLocation, useParams } from 'react-router-dom';
import CustomContent from '../components/CustomContent';


function ChatPage() {

const {id} =   useParams()

const {error, isError,setError, removeError} = useErrorStore((state)=>
({
  error:state.error,
  isError:state.isError, 
  setError:state.setError, 
  removeError:state.removeError
  }))

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
      message: "Hello, I'm WikiGPT! Choose your title and ask me anything about it!",
      sentTime: "just now",
      sender: "WikiGPT"
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
    
    axios({
      method: 'get',
      url,
      headers:customHeaders,
      params: {
        query:newMessages[newMessages.length-1].message
      }
    }).then((response) => {

      setMessages([...newMessages, {
      message: response.data,
      sendTime: Date.now(),
      sender: "WikiGPT"
    }]);

    console.log(messages)
      setIsTyping(false)

        }).catch((error) => {

          setError({content:(error.message), title:error.name})
          
          // setMessages([...newMessages, {
          //   message: JSON.stringify(error),
          //   sender: "WikiGPT"
          // }]);

      setIsTyping(false)
      // console.log("Error",error.message, error.code, error.config);
    })
  }

  // useEffect(()=>{
  //   setTimeout(setMessages(data), 100000)
  //   setLoading(false)
    
  // }
  // , [])

  return (
    <ChatContainer>  

    {/* header */}
    <Header as={ConversationHeader} name={id}/> 
    {/* end of header */}

    {/* message list */}
    <MessageList
    loadingMorePosition="bottom" 
    // loading = {loading}
    // typingIndicator={isTyping ? <TypingIndicator content="WikiGPT is typing" /> : null}
    scrollBehavior="smooth" 
    >
    {id ?
      messages.map((message, i) => (
        <Message onClick={toggleSidebar} className='drop_shadow' key={i} model={message}>
        </Message>
        )) : 
      <MessageList.Content className='custom__content' style={{display: "flex","flexDirection": "column","justifyContent": "center",height: "100%",textAlign: "center",fontSize: "1.2em"}} >
          <CustomContent /> 
      </MessageList.Content>
    }
      <MessageInput className='drop_shadow input__search' onSend={handleSend} />
      </MessageList>

  </ChatContainer>
  )
}

export default ChatPage