import React, {useState} from 'react'

import useErrorStore from '../store/Error';



function Error() {  

  const {error, isError, removeError} = useErrorStore((state)=>
  ({
    error:state.error,
    isError:state.isError, 
    removeError:state.removeError
    }))


  const cancel = (e) =>{
    e.stopPropagation();
    removeError();
    console.log(error);
  }

  return (
     isError ?  
      <>
      <section onClick={cancel} className='error__backdrop'>
      </section>
    <div className='error'>
      <div>
        <img onClick={cancel} className='error__icon' src="/src/assets/icons/cancel-icon.png" alt="" />
      <span className='error__title'>{error.title}</span>
      </div>

      <p className='error__detail'>{error.content}</p>
      </div>
    </>
    :<></>
    )
}

export default Error