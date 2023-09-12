import React from 'react'
import Header from '../components/Header'
import { Search, Button, Avatar } from '@chatscope/chat-ui-kit-react'

//store
import useProfileStore from '../store/Profile'



function Profile() {
  const {picture, characters, togglePicture} = useProfileStore((state)=>({picture:state.picture, characters:state.characters, togglePicture:state.togglePicture}))

  return (
    <div className='page'>
    <Header name={'profile'} />
    <div className='page__wrapper profile'>
        <Avatar className='profile__img avatar__profile' style={{width:'175px', height:'175px'}} src={`/src/assets/chatacters/${characters[picture]}`}  />
        <div>
        <p>Tibebe Solomon</p>
        <p>tibesolomon7@gmail.com</p>
        </div>

        <div style={{display:'flex', justifyContent:'space-around', gap:'24px'}}>
        
        <div>
          <p>21 Sessions</p>
        <p>Session</p>
        </div>

        <div>
        <p>Jan 1 , 2024</p>
        <p>Date Joined</p>
        </div>
        
        </div>

        <Button className='drop_shadow button__logout' style={{}}> Log Out</Button>
    </div>
</div>

  )
}

export default Profile