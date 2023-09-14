import React from 'react'
import { useEffect } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

// components
import SideBarActions from './SideBarActions';
import {ConversationHeader, Avatar, Button,InfoButton } from '@chatscope/chat-ui-kit-react';

//animations
import { motion} from 'framer-motion'
import { useAnimation } from 'framer-motion';

//store
import useSideBarStore from '../store/Sidebar.jsx';
import useProfileStore from '../store/Profile';


function Header({name='new chat'}) {

    const {sidebar, toggleSidebar} = useSideBarStore((state)=>({sidebar:state.sidebar,toggleSidebar:state.toggleSidebar}))
    const {picture, characters, togglePicture} = useProfileStore((state)=>({picture:state.picture, characters:state.characters, togglePicture:state.togglePicture}))
    const mainControls = useAnimation();
    const navigate = useNavigate();

    const goBack = () =>{
      navigate(-1);
    }

    useEffect(()=>{
      if(sidebar){
        mainControls.start("hidden")
        console.log(sidebar)
      }
      else{
        mainControls.start("visible")
      }
    },[sidebar])

  return (
    <div
      className='cs-conversation-header'
      style={{borderBottom:'2px solid black'}}>
        {/* {sidebar ? : } */}
       <motion.div
       variants={{
        hidden:{scale:0},
        visible:{scale:1},
        transition:{
          delay:3
        }
      }}
    animate={mainControls}>
       <SideBarActions clicked={toggleSidebar} as={'Avatar'} src={'/src/assets/icons/sidepanel-icon.png'}  title={'side-panel'} /> 
       </motion.div>        
        <ConversationHeader.Back onClick={goBack} />
        {/* not allowed to have both */}
        {/* <ArrowButton as={ConversationHeader.Back} direction="right" /> */}
        {/* <ArrowButton as={ConversationHeader.Back} direction="left" /> */}
        <ConversationHeader.Content className='capitalize' userName={name}/>
    <ConversationHeader.Actions>                                                                             

<NavLink to="/profile">
<Button onClick={togglePicture} icon={<Avatar style={{width: '42px',height: '42px'}} title={'profile'} src={`/src/assets/chatacters/${characters[picture]}`} />} title="Add to favourites" />
</NavLink>


<InfoButton style={{marginLeft:'15px'}} title="Help" /> 

</ConversationHeader.Actions>
    </div>  
  )
}

export default Header