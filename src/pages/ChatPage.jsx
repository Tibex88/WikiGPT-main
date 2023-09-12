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
 
    setMessages(data)
  }
  , [])

  return (
    <ChatContainer>  

    {/* header */}
    <Header as={ConversationHeader} name={id}/> 
    {/* end of header */}

    {/* message list */}
    <MessageList
      scrollBehavior="smooth" 
      // typingIndicator={isTyping ? <TypingIndicator content="WikiGPT is typing" /> : null}
    >
      {messages.map((message, i) => {
        if (i <5)
        return <Message onClick={toggleSidebar} className='drop_shadow' key={i} model={message}>
          <Message.Footer style={{height:'30px', width:'30px'}} sender="Emily" sentTime="just now" />
        </Message>
      })}
    </MessageList>

    {/* message input */}
    {/* <div>
      <input type="text" placeholder='Ask anything' />
    </div> */}
    <MessageInput placeholder="Ask me a question..." onSend={handleSend} />      
    {/* <input className='' style={{bottom:'10px'}} as={MessageInput} type="text" placeholder='Input' /> */}
    {/* <div as={MessageInput} style={{
display: "flex",
flexDirection: "row",
borderTop: "1px dashed #d1dbe4"
}}> */}

{/* <input type="text"style={{position:'fixed' ,bottom:'0px', left:'0px'}} /> */}

{/* <div className='input'>

<MessageInput className='drop_shadow'  sendButton={true} attachButton={false} onSend={handleSend} style={{
  flexGrow: 1,
  borderTop: 0,
  flexShrink: "initial",
  position:'sticky',
  width:'30%',
}} />                                

</div> */}
                    {/* </div> */}
                    {/* <SendButton onClick={() => handleSend()} style={{
  fontSize: "1.2em",
  marginLeft: 0,
  paddingLeft: "0.2em",
  paddingRight: "0.2em"
}}/> */}
                    {/* <AttachmentButton style={{
  fontSize: "1.2em",
  paddingLeft: "0.2em",
  paddingRight: "0.2em"
}} />
                    <InfoButton onClick={() => alert("Important message!")} style={{
  fontSize: "1.2em",
  paddingLeft: "0.2em",
  paddingRight: "0.2em"
}} />  */}
                {/* </div> */}

  </ChatContainer>
  )
}

export default ChatPage