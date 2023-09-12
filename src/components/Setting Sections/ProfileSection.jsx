import React from 'react'

function ProfileSection() {
  return (
    <div className='card__wrapper '>
        <p className='card__title'>Profile</p>
        <div className='card__content drop_shadow' style={{}}>
            <p>Login</p>
            <p>Update Information</p>
            <p>Manage Account Settings</p>
            <p>LogOut</p>
            <p>Delete Account</p>
        </div>
      </div>
  )
}

export default ProfileSection
