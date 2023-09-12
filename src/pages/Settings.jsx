import React from 'react'
import Header from '../components/Header'

//sections
import DataSection from '../components/Setting Sections/DataSection'
import ProfileSection from '../components/Setting Sections/ProfileSection'
import PrivacySecurity from '../components/Setting Sections/PrivacySecurity'
import GeneralSection from '../components/Setting Sections/GeneralSection'
import AccountSection from '../components/Setting Sections/AccountSection'

function Settings() {
  return (
<div className='page'>
    <Header name={'settings'} />
    <div className='page__wrapper'>
      <GeneralSection />
      <AccountSection />
      <ProfileSection />
      <PrivacySecurity />
      <DataSection /> 
    </div>
</div>
  )
}

export default Settings