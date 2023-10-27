import { Avatar } from '@chatscope/chat-ui-kit-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

function CustomContent() {
  return (
    <NavLink style={{margin:'auto',backgroundColor: "#a28351de",zIndex: "2",position:" relative"}} className='card__title' to="/explore">
        <div>Start a new chat</div>
    </NavLink>
  )
}

export default CustomContent