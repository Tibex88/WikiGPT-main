import React from 'react'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// import  wiki from 'wikipedia';
import axios from 'axios';

//store
import useErrorStore from '../store/Error';

//components
import {ExpansionPanel,ConversationHeader, MessageList, Message, MessageInput, ChatContainer, InfoButton , TypingIndicator, Sidebar, Avatar } from '@chatscope/chat-ui-kit-react';
import Header from '../components/Header';

//animation
import { motion, useAnimation } from 'framer-motion';

import data from '../devData/data'
import { useLocation, useParams } from 'react-router-dom';
import CustomContent from '../components/CustomContent';
import SideBarActions from '../components/SideBarActions';


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

const toggleLeftSidebar = (e) => {
  setLeftSideBar(!leftSiidebar)
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

const [leftSiidebar, setLeftSideBar] = useState(false);
  

  // useEffect(()=>{
  //   setTimeout(setMessages(data), 100000)
  //   setLoading(false)
    
  // }
  // , [])

useEffect(()=>{
    if(!leftSiidebar){
      mainControls.start("hidden")
      console.log(leftSiidebar)
    }
    else{
      mainControls.start("visible")
    }
  },[leftSiidebar])

const mainControls = useAnimation();


  return (
    <>
    <ChatContainer>  

    {/* header */}
    <Header as={ConversationHeader} name={id}>
    <InfoButton onClick={()=>(setLeftSideBar(!leftSiidebar))} title="Help" /> 
    </Header> 
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
        <Message className='drop_shadow' key={i} model={message}>
        </Message>
        )) : 
      <MessageList.Content className='custom__content' style={{display: "flex","flexDirection": "column","justifyContent": "center",height: "100%",textAlign: "center",fontSize: "1.2em"}} >
          <CustomContent /> 
      </MessageList.Content>
    }
      <MessageInput className='drop_shadow input__search' onSend={handleSend} />
      </MessageList>

  </ChatContainer>

{id ? 

<motion.div
  variants={{
    visible:{display:'block'},
    hidden:{display:'none'},
  }}
  initial = "visible"
  animate={mainControls}
  style={{overflowY: 'scroll'}}
 className={'scrollbar-container cs-sidebar cs-sidebar--right'}
  >

  <SideBarActions clicked={toggleLeftSidebar} as={'Avatar'} src={'/src/assets/icons/cancel-icon.png'}  title={'side-panel'} /> 
     

<ExpansionPanel style={{backgroundColor:'#ff7051'}} open title="SUMMARY">

  <p>Lorem ipsum</p>

  <p>Lorem ipsum</p>

  <p>Lorem ipsum</p>

  <p>Lorem ipsum</p>

</ExpansionPanel>

<ExpansionPanel title="MEDIA">

  <p>Lorem ipsum</p>

  <p>Lorem ipsum</p>

  <p>Lorem ipsum</p>

  <p>Lorem ipsum</p>

</ExpansionPanel>

<ExpansionPanel title="REFERENCES">

  <p>Lorem ipsum</p>

  <p>Lorem ipsum</p>

  <p>Lorem ipsum</p>

  <p>Lorem ipsum</p>

</ExpansionPanel>


<ExpansionPanel title="SECTIONS">

  <p>Lorem ipsum</p>

  <p>Lorem ipsum</p>

  <p>Lorem ipsum</p>

  <p>Lorem ipsum</p>

</ExpansionPanel>


<ExpansionPanel title="OPTIONS">

  <p>Lorem ipsum</p>

  <p>Lorem ipsum</p>

  <p>Lorem ipsum</p>

  <p>Lorem ipsum</p>

</ExpansionPanel>

</motion.div>
    :<></>}
    </>
    )
  }
  
  export default ChatPage