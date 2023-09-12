import React from 'react'
import { NavLink } from "react-router-dom";


import Header from '../components/Header'
import SideBarActions from '../components/SideBarActions'

function NotFound() {
  return (
    <div className='page'>
    <Header name={'Not Found'} />
    <div className='page__wrapper'>
        <p style={{fontSize:'50px'}}>Page is not found</p>
        <p style={{fontSize:'50px'}}>Explore new content instead</p>
        
        <NavLink to='explore'>
        <SideBarActions  src={'/src/assets/icons/explore-icon.png'}  title={'explore'} />
        </NavLink>
    </div>
    </div>
  )
}

export default NotFound