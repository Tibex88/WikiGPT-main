import { Avatar } from '@chatscope/chat-ui-kit-react'
import React from 'react'
import {BsTwitter,BsLinkedin, BsTelegram} from 'react-icons/bs'

function SocialLinks({color="#fff"}) {
  return (
    <div style={{backgroundColor:color , border:'1px solid black', display:'flex', justifyContent:'space-evenly', alignItems:'center', padding:'1px',}}>
        <div>
        <p style={{textTransform:'capitalize', fontSize:'15px'}}>follow us on</p>
        </div>
        
        <a target="_blank" href="">
          <Avatar  src={"/src/assets/icons/instagram-icon.png"} />
        </a>
        
        <a target="_blank" href="">
          <Avatar  src={"/src/assets/icons/twitter-icon.png"} />
        </a>
        
        <a target="_blank" href="">
          <Avatar  src={"/src/assets/icons/telegram-icon.png"} />
        </a>
        
        <a target="_blank" href="">
          <Avatar  src={"/src/assets/icons/linkedin-icon.png"} />
        </a>
        
        <a target="_blank" href="">
          <Avatar  src={"/src/assets/icons/facebook-icon.png"} />
        </a>
        {/* <a>
            <BsTwitter />
        </a>
        <a target="_blank" href="">
            <BsLinkedin />
        </a>
        <a target="_blank" href="">
            <BsTelegram />
        </a> */}
    </div>
  )
}

export default SocialLinks