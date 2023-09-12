import React from 'react'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SideBarActions from './SideBarActions';

import {ArrowButton, StarButton,ConversationHeader, Avatar, Button,InfoButton } from '@chatscope/chat-ui-kit-react';
import { transform } from 'framer-motion';
import useSideBarStore from '../store/Sidebar.jsx';
import useProfileStore from '../store/Profile';


function Header({name='title'}) {

    const {sidebar, toggleSidebar} = useSideBarStore((state)=>({sidebar:state.sidebar,toggleSidebar:state.toggleSidebar}))
    const {picture, characters, togglePicture} = useProfileStore((state)=>({picture:state.picture, characters:state.characters, togglePicture:state.togglePicture}))
    const navigate = useNavigate();

    const goBack = () =>{
      navigate(-1);
    }

  return (
    <ConversationHeader style={{borderBottom:'2px solid black'}}>
       {!sidebar? <SideBarActions clicked={toggleSidebar} as={'Avatar'} src={'/src/assets/icons/sidepanel-icon.png'}  title={'side-panel'} /> : <div as={'Avatar'}></div> }
        <ConversationHeader.Back onClick={goBack} />
        {/* not allowed to have both */}
        {/* <ArrowButton as={ConversationHeader.Back} direction="right" /> */}
        {/* <ArrowButton as={ConversationHeader.Back} direction="left" /> */}
        <ConversationHeader.Content className='capitalize' userName={name}/>
    <ConversationHeader.Actions>                                                                             

<NavLink to="/profile">
<Button onClick={togglePicture} icon={<Avatar style={{width: '42px',height: '42px'}} title={'profile'} src={`/src/assets/chatacters/${characters[picture]}`} />} title="Add to favourites" />
</NavLink>

{/* <VoiceCallButton title="Start voice call" />

<VideoCallButton title="Start video call" />

*/}
<InfoButton style={{marginLeft:'15px'}} title="Help" /> 

</ConversationHeader.Actions>
    </ConversationHeader>  
  )
}

export default Header