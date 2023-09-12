import React from 'react'

function GeneralSection() {
  return (
    <div className='card__wrapper '>
    <p className='card__title'>General</p>
    <div className='card__content drop_shadow' style={{}}>
        <p>Language Preferences</p>
        <p>Accessibility Settings (Font size, contrast)</p>
    </div>
  </div>
  )
}

export default GeneralSection
