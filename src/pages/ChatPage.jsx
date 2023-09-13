import React from 'react'
import { useState, useEffect } from 'react';

// import  wiki from 'wikipedia';
import axios from 'axios';

//
import useErrorStore from '../store/Error';

//components
import {ExpansionPanel ,InfoButton,AttachmentButton,ConversationHeader, Avatar, SendButton, MessageList, Message, MessageInput, ChatContainer, TypingIndicator, Sidebar } from '@chatscope/chat-ui-kit-react';
import Header from '../components/Header';

import data from '../devData/data'
import { useLocation, useParams } from 'react-router-dom';


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
      // loading = {loading}
      scrollBehavior="smooth" 
      // typingIndicator={isTyping ? <TypingIndicator content="WikiGPT is typing" /> : null}
    >
      {messages.map((message, i) => {
        // if (i <5)
        return <Message onClick={toggleSidebar} className='drop_shadow' key={i} model={message}>
          {/* <Message.Footer style={{height:'30px', width:'30px'}} sender="Emily" sentTime="just now" /> */}
        </Message>
      })
      }
    </MessageList>

    {/* message input */}
    <MessageInput placeholder="Ask me a question..." onSend={handleSend} />      
   
    <Sidebar>

<ExpansionPanel open title="Localization">

  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis dictum tortor, sed mollis justo lacinia eget. In pharetra volutpat eros, in tempus est pellentesque quis. Vivamus pretium sodales ex at suscipit. In porta libero turpis, sit amet mattis quam vestibulum vel. In non felis eu enim hendrerit fringilla ut in lacus. Quisque leo tortor, feugiat vitae sagittis eget, mattis quis dui. Cras bibendum luctus finibus. Mauris id neque nec nunc malesuada eleifend maximus et enim.</p>

  <p>Duis aliquam vestibulum cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elit nunc, eleifend a pulvinar eget, sodales ut lectus. Integer eu nibh velit. Phasellus maximus malesuada nisi in aliquam. In convallis orci id quam aliquam bibendum. Integer consectetur fermentum molestie. Cras id mi efficitur, porta quam et, laoreet neque.</p>                  

  <p>Nam dapibus nibh nec felis porta lobortis. Nulla risus nibh, sollicitudin eget sagittis quis, posuere quis diam. Morbi sagittis dignissim turpis nec vehicula. In accumsan finibus eros, in pellentesque sem. Nullam id sapien et erat pellentesque feugiat nec ut justo. Pellentesque ut lorem pulvinar, condimentum velit non, condimentum lectus. Donec aliquam tincidunt posuere. Vestibulum sollicitudin eget magna sodales facilisis. Suspendisse potenti. Suspendisse et magna risus. Vivamus orci elit, rutrum vel rhoncus ut, ullamcorper non felis. Pellentesque aliquam, erat sed aliquam auctor, ex dolor ultrices ipsum, eu volutpat dui erat at dolor. Praesent viverra nisl eget enim facilisis ultricies. Vivamus ultrices, turpis et luctus lacinia, mauris diam fringilla mauris, sit amet maximus est diam sed eros. Nulla maximus pellentesque diam quis mattis.</p>                  

  <p>Integer pretium, velit vitae mollis commodo, magna odio semper ex, nec pharetra enim augue non tortor. Curabitur aliquet in tortor tristique sagittis. Praesent sed justo mattis, ullamcorper quam vitae, mollis lacus. Mauris sagittis lectus eget sodales cursus. Curabitur eget nisi tristique, malesuada sem sed, feugiat sem. Etiam magna sapien, pulvinar ut leo in, viverra luctus orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed metus sem, aliquet finibus dapibus ullamcorper, pretium sed nibh. Donec finibus, magna et tristique dictum, ex sapien efficitur eros, eu porttitor nunc sapien nec ligula. Donec quis dolor at nunc faucibus pellentesque vel sit amet dolor. Proin et risus gravida, pharetra magna sit amet, consequat ex. Praesent porttitor, erat sodales tristique dictum, mi tellus accumsan mi, quis blandit nunc magna in neque. Phasellus id consectetur dui, quis pretium arcu.</p>            

  <p>Integer rutrum semper augue ut ullamcorper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras condimentum lorem sit amet dui sollicitudin consectetur. Vivamus ac rhoncus massa. Sed aliquam pretium vehicula. Maecenas vitae consectetur est, imperdiet laoreet ex. Sed tortor purus, dignissim sed nisi sed, ornare rhoncus risus. Donec ultrices metus sit amet eleifend sodales. Praesent ac leo a arcu dapibus laoreet. Nulla finibus orci a odio fringilla ullamcorper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque semper metus eleifend dapibus consequat. Donec consequat congue ligula nec fermentum. Fusce lobortis ipsum sed lacus sodales, at elementum leo ultricies.</p>                    

</ExpansionPanel>

<ExpansionPanel title="Survey">

  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis dictum tortor, sed mollis justo lacinia eget. In pharetra volutpat eros, in tempus est pellentesque quis. Vivamus pretium sodales ex at suscipit. In porta libero turpis, sit amet mattis quam vestibulum vel. In non felis eu enim hendrerit fringilla ut in lacus. Quisque leo tortor, feugiat vitae sagittis eget, mattis quis dui. Cras bibendum luctus finibus. Mauris id neque nec nunc malesuada eleifend maximus et enim.</p>

  <p>Duis aliquam vestibulum cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elit nunc, eleifend a pulvinar eget, sodales ut lectus. Integer eu nibh velit. Phasellus maximus malesuada nisi in aliquam. In convallis orci id quam aliquam bibendum. Integer consectetur fermentum molestie. Cras id mi efficitur, porta quam et, laoreet neque.</p>                  

  <p>Nam dapibus nibh nec felis porta lobortis. Nulla risus nibh, sollicitudin eget sagittis quis, posuere quis diam. Morbi sagittis dignissim turpis nec vehicula. In accumsan finibus eros, in pellentesque sem. Nullam id sapien et erat pellentesque feugiat nec ut justo. Pellentesque ut lorem pulvinar, condimentum velit non, condimentum lectus. Donec aliquam tincidunt posuere. Vestibulum sollicitudin eget magna sodales facilisis. Suspendisse potenti. Suspendisse et magna risus. Vivamus orci elit, rutrum vel rhoncus ut, ullamcorper non felis. Pellentesque aliquam, erat sed aliquam auctor, ex dolor ultrices ipsum, eu volutpat dui erat at dolor. Praesent viverra nisl eget enim facilisis ultricies. Vivamus ultrices, turpis et luctus lacinia, mauris diam fringilla mauris, sit amet maximus est diam sed eros. Nulla maximus pellentesque diam quis mattis.</p>                  

  <p>Integer pretium, velit vitae mollis commodo, magna odio semper ex, nec pharetra enim augue non tortor. Curabitur aliquet in tortor tristique sagittis. Praesent sed justo mattis, ullamcorper quam vitae, mollis lacus. Mauris sagittis lectus eget sodales cursus. Curabitur eget nisi tristique, malesuada sem sed, feugiat sem. Etiam magna sapien, pulvinar ut leo in, viverra luctus orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed metus sem, aliquet finibus dapibus ullamcorper, pretium sed nibh. Donec finibus, magna et tristique dictum, ex sapien efficitur eros, eu porttitor nunc sapien nec ligula. Donec quis dolor at nunc faucibus pellentesque vel sit amet dolor. Proin et risus gravida, pharetra magna sit amet, consequat ex. Praesent porttitor, erat sodales tristique dictum, mi tellus accumsan mi, quis blandit nunc magna in neque. Phasellus id consectetur dui, quis pretium arcu.</p>            

  <p>Integer rutrum semper augue ut ullamcorper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras condimentum lorem sit amet dui sollicitudin consectetur. Vivamus ac rhoncus massa. Sed aliquam pretium vehicula. Maecenas vitae consectetur est, imperdiet laoreet ex. Sed tortor purus, dignissim sed nisi sed, ornare rhoncus risus. Donec ultrices metus sit amet eleifend sodales. Praesent ac leo a arcu dapibus laoreet. Nulla finibus orci a odio fringilla ullamcorper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque semper metus eleifend dapibus consequat. Donec consequat congue ligula nec fermentum. Fusce lobortis ipsum sed lacus sodales, at elementum leo ultricies.</p>                    

</ExpansionPanel>

<ExpansionPanel title="Options">

  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis dictum tortor, sed mollis justo lacinia eget. In pharetra volutpat eros, in tempus est pellentesque quis. Vivamus pretium sodales ex at suscipit. In porta libero turpis, sit amet mattis quam vestibulum vel. In non felis eu enim hendrerit fringilla ut in lacus. Quisque leo tortor, feugiat vitae sagittis eget, mattis quis dui. Cras bibendum luctus finibus. Mauris id neque nec nunc malesuada eleifend maximus et enim.</p>

  <p>Duis aliquam vestibulum cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elit nunc, eleifend a pulvinar eget, sodales ut lectus. Integer eu nibh velit. Phasellus maximus malesuada nisi in aliquam. In convallis orci id quam aliquam bibendum. Integer consectetur fermentum molestie. Cras id mi efficitur, porta quam et, laoreet neque.</p>                  

  <p>Nam dapibus nibh nec felis porta lobortis. Nulla risus nibh, sollicitudin eget sagittis quis, posuere quis diam. Morbi sagittis dignissim turpis nec vehicula. In accumsan finibus eros, in pellentesque sem. Nullam id sapien et erat pellentesque feugiat nec ut justo. Pellentesque ut lorem pulvinar, condimentum velit non, condimentum lectus. Donec aliquam tincidunt posuere. Vestibulum sollicitudin eget magna sodales facilisis. Suspendisse potenti. Suspendisse et magna risus. Vivamus orci elit, rutrum vel rhoncus ut, ullamcorper non felis. Pellentesque aliquam, erat sed aliquam auctor, ex dolor ultrices ipsum, eu volutpat dui erat at dolor. Praesent viverra nisl eget enim facilisis ultricies. Vivamus ultrices, turpis et luctus lacinia, mauris diam fringilla mauris, sit amet maximus est diam sed eros. Nulla maximus pellentesque diam quis mattis.</p>                  

  <p>Integer pretium, velit vitae mollis commodo, magna odio semper ex, nec pharetra enim augue non tortor. Curabitur aliquet in tortor tristique sagittis. Praesent sed justo mattis, ullamcorper quam vitae, mollis lacus. Mauris sagittis lectus eget sodales cursus. Curabitur eget nisi tristique, malesuada sem sed, feugiat sem. Etiam magna sapien, pulvinar ut leo in, viverra luctus orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed metus sem, aliquet finibus dapibus ullamcorper, pretium sed nibh. Donec finibus, magna et tristique dictum, ex sapien efficitur eros, eu porttitor nunc sapien nec ligula. Donec quis dolor at nunc faucibus pellentesque vel sit amet dolor. Proin et risus gravida, pharetra magna sit amet, consequat ex. Praesent porttitor, erat sodales tristique dictum, mi tellus accumsan mi, quis blandit nunc magna in neque. Phasellus id consectetur dui, quis pretium arcu.</p>            

  <p>Integer rutrum semper augue ut ullamcorper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras condimentum lorem sit amet dui sollicitudin consectetur. Vivamus ac rhoncus massa. Sed aliquam pretium vehicula. Maecenas vitae consectetur est, imperdiet laoreet ex. Sed tortor purus, dignissim sed nisi sed, ornare rhoncus risus. Donec ultrices metus sit amet eleifend sodales. Praesent ac leo a arcu dapibus laoreet. Nulla finibus orci a odio fringilla ullamcorper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque semper metus eleifend dapibus consequat. Donec consequat congue ligula nec fermentum. Fusce lobortis ipsum sed lacus sodales, at elementum leo ultricies.</p>                    

</ExpansionPanel>

<ExpansionPanel title="Media">

  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis dictum tortor, sed mollis justo lacinia eget. In pharetra volutpat eros, in tempus est pellentesque quis. Vivamus pretium sodales ex at suscipit. In porta libero turpis, sit amet mattis quam vestibulum vel. In non felis eu enim hendrerit fringilla ut in lacus. Quisque leo tortor, feugiat vitae sagittis eget, mattis quis dui. Cras bibendum luctus finibus. Mauris id neque nec nunc malesuada eleifend maximus et enim.</p>

  <p>Duis aliquam vestibulum cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elit nunc, eleifend a pulvinar eget, sodales ut lectus. Integer eu nibh velit. Phasellus maximus malesuada nisi in aliquam. In convallis orci id quam aliquam bibendum. Integer consectetur fermentum molestie. Cras id mi efficitur, porta quam et, laoreet neque.</p>                  

  <p>Nam dapibus nibh nec felis porta lobortis. Nulla risus nibh, sollicitudin eget sagittis quis, posuere quis diam. Morbi sagittis dignissim turpis nec vehicula. In accumsan finibus eros, in pellentesque sem. Nullam id sapien et erat pellentesque feugiat nec ut justo. Pellentesque ut lorem pulvinar, condimentum velit non, condimentum lectus. Donec aliquam tincidunt posuere. Vestibulum sollicitudin eget magna sodales facilisis. Suspendisse potenti. Suspendisse et magna risus. Vivamus orci elit, rutrum vel rhoncus ut, ullamcorper non felis. Pellentesque aliquam, erat sed aliquam auctor, ex dolor ultrices ipsum, eu volutpat dui erat at dolor. Praesent viverra nisl eget enim facilisis ultricies. Vivamus ultrices, turpis et luctus lacinia, mauris diam fringilla mauris, sit amet maximus est diam sed eros. Nulla maximus pellentesque diam quis mattis.</p>                  

  <p>Integer pretium, velit vitae mollis commodo, magna odio semper ex, nec pharetra enim augue non tortor. Curabitur aliquet in tortor tristique sagittis. Praesent sed justo mattis, ullamcorper quam vitae, mollis lacus. Mauris sagittis lectus eget sodales cursus. Curabitur eget nisi tristique, malesuada sem sed, feugiat sem. Etiam magna sapien, pulvinar ut leo in, viverra luctus orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed metus sem, aliquet finibus dapibus ullamcorper, pretium sed nibh. Donec finibus, magna et tristique dictum, ex sapien efficitur eros, eu porttitor nunc sapien nec ligula. Donec quis dolor at nunc faucibus pellentesque vel sit amet dolor. Proin et risus gravida, pharetra magna sit amet, consequat ex. Praesent porttitor, erat sodales tristique dictum, mi tellus accumsan mi, quis blandit nunc magna in neque. Phasellus id consectetur dui, quis pretium arcu.</p>            

  <p>Integer rutrum semper augue ut ullamcorper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras condimentum lorem sit amet dui sollicitudin consectetur. Vivamus ac rhoncus massa. Sed aliquam pretium vehicula. Maecenas vitae consectetur est, imperdiet laoreet ex. Sed tortor purus, dignissim sed nisi sed, ornare rhoncus risus. Donec ultrices metus sit amet eleifend sodales. Praesent ac leo a arcu dapibus laoreet. Nulla finibus orci a odio fringilla ullamcorper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque semper metus eleifend dapibus consequat. Donec consequat congue ligula nec fermentum. Fusce lobortis ipsum sed lacus sodales, at elementum leo ultricies.</p>                    

</ExpansionPanel>                                                            

</Sidebar>

  </ChatContainer>
  )
}

export default ChatPage