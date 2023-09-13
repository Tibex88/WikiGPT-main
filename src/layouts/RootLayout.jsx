import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from 'react'

import {MessageSeparator,InfoButton,AttachmentButton,Search,ConversationHeader, Avatar, SendButton, MainContainer, MessageList, Message, MessageInput, TypingIndicator, Sidebar, ConversationList, Conversation, Button } from '@chatscope/chat-ui-kit-react';


//store
import useSideBarStore from '../store/Sidebar.jsx'

// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

//components
import SideBarActions from '../components/SideBarActions';
import Setting from '../components/Setting';
import SocialLinks from '../components/SocialLinks';

//data
// import articles from "../devData/articles.jsx";
import useArticleStore from  "../store/Article.jsx"

export default function RootLayout() {

  const currentDate = new Date(); // Create a Date object with the current date and time
  const isoDateString = currentDate.toISOString().split('T')[0];;


     /// custom mouse
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  
  const [cursorVariant, setCursorVariant] = useState("default");
  // const [showSideBar, setShowSideBar] = useState(true)


  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    }
  }, []);

  // const variants = {
  //   default: {
  //     x: mousePosition.x - 16,
  //     y: mousePosition.y - 16,
  //   },
  //   text: {
  //     // height: 150,
  //     // width: 150,
  //     // x: mousePosition.x - 75,
  //     // y: mousePosition.y - 75,
  //     // backgroundColor: "yellow",
  //     // mixBlendMode: "difference"
  //   }
  // }

  
  // const textEnter = () => setCursorVariant("text");
  // const textLeave = () => setCursorVariant("default");
  const {sidebar, toggleSidebar} = useSideBarStore((state)=>({sidebar: state.sidebar, toggleSidebar:state.toggleSidebar}))
  const {articles} = useArticleStore((state)=>({articles: state.articles}))
 

  return (
    <MainContainer>
      {/* {sidebar?  */}
    <Sidebar className={!sidebar? 'hide':'show'} position='left'>
      
      {/* sidebar actions */}
      <div className="nav"  style={{display:'flex',alignItems:'center' , justifyContent:'space-around'}}>
        
        <NavLink to='/chat/new chat'>
        <SideBarActions src={'/src/assets/icons/add-icon.png'}  title={'new chat'}  />
        </NavLink>

        <NavLink to='explore'>
        <SideBarActions  src={'/src/assets/icons/explore-icon.png'}  title={'explore'} />
        </NavLink>
        {/* <NavLink to='/'>  */}

        <SideBarActions clicked={toggleSidebar} src={'/src/assets/icons/sidepanel-icon.png'}  title={'side-panel'} />
        {/* </NavLink> */}
      </div> 
      {/* search bar */}
      <Search className='m0' placeholder='Search' />
      
      {/* conversation list */}
      <ConversationList>
      {  
      // conversations
      articles.map((article, index) => (
        <>
        {/* //   <MessageSeparator style={{marginBottom :'1em'}} content={isoDateString}  as={Conversation}/> */}
        
          <NavLink to={`/chat/${article.name}`}>
        <Conversation style={{display:"flex",alignItems:'center', justifyContent:"space-between"}} key={index}  active={false}>
          <Conversation.Content> {article.name} </Conversation.Content>
        <Conversation.Operations visible >
          {/*
          {/* operations */}
          <Avatar onClick={() => alert('delete clicked')} title="delete conversation" style={{width:'10px',height:'10px'}} src="/SRC/assets/icons/delete-icon.png" />
          <Button onClick={() => alert('edit clicked')} title="edit name" icon={<Avatar style={{width:'10px',height:'10px'}} src="/SRC/assets/icons/hand-with-pen-icon.png" />} />
          <Button onClick={() => alert('favourite clicked')} title="mark as favorite" icon={<Avatar style={{width:'10px',height:'10px', filter: 'grayscale(100%)'}} src="/SRC/assets/icons/star.png" />} />
          </Conversation.Operations>
        </Conversation>
          </NavLink> 
        </>
      ))
    }
      </ConversationList>
      
      {/* setttings */}
    <div className="setting_bar">
        
        <NavLink to='history'>
        <Setting title='history' src='/src/assets/icons/history-icon.png' />
        </NavLink>

        <NavLink to='settings'>
        <Setting title="settings" src='/src/assets/icons/settings-icon.png' />
        </NavLink>
        
        {/* <NavLink to='profile'>
        <Setting title='profile' src='/src/assets/icons/history-icon.png' />
        </NavLink> */}

      {/* <Setting /> */}
      <SocialLinks />
      </div>

    </Sidebar>

    {/* <ChatPage /> */}
    <Outlet />
  </MainContainer>
  )
}