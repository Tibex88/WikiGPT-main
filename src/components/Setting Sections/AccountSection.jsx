import React from 'react'

function AccountSection() {
  return (
    <div className='card__wrapper '>
        <p className='card__title'>Account</p>
        <div className='card__content drop_shadow' style={{}}>
            <p>Username</p>
            <p>Email Address</p>
            <p>Password</p>
            <p>Two-Factor Authentication</p>
            <p>Delete Account</p>
        </div>
      </div>
  )
}

export default AccountSection
