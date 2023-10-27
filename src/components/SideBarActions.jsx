import React from 'react'
import {AiFillQuestionCircle} from 'react-icons/ai'
import { NavLink } from 'react-router-dom'


function SideBarActions({src, title="default", color="ff7051", clicked}) {
  
  return (
    <div onClick={clicked} title={title} className='drop_shadow'>
    <div style={{backgroundColor:color ,borderRadius:'7px', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column' ,padding:'5px'}}>
      <img  src={src} style={{aspectRatio:"1", height:'40px'}}  />
    {/* <div style={{display:'flex', justifyContent:'center', alignItems:'center',fontSize:'30px'}}>
    </div> */}
    {/* <p style={{textTransform:'uppercase', fontSize:'15px'}}>{title}</p> */}
    </div>
    </div>        
  )
}

export default SideBarActions