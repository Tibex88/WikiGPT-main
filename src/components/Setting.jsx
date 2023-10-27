import React from 'react'
import {AiFillSetting} from 'react-icons/ai'

function Setting({icon=<AiFillSetting />, src, title="default ->", color="#23a094"}) {
  return (
    <div className='setting_bar' style={{  display:'flex', justifyContent:'flex-start', alignItems:'center', padding:'2px',}}>
    <div style={{display:'flex', justifyContent:'center', alignItems:'center',fontSize:'30px'}}>
    {/* <AiFillSetting className='icon_shadow' style={{paddingRight:'16px'}}/> */}
    <img style={{width: '52px', height: '52px', marginRight:"40px" }}src={src} alt="" />
    </div>
    <p style={{textTransform:'capitalize', fontSize:'15px'}}>{title}</p>
    </div>
            
  )
}

export default Setting