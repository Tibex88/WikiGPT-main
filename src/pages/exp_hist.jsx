import React from 'react'

import Header from '../components/Header'
import { Search, Button, ConversationList, Conversation } from '@chatscope/chat-ui-kit-react'

function ExpHist({title}) {
  return (
    <div className='page'>
        <Header name={title} />
        <div className='page__wrapper'>
            <Search className='input__search' placeholder='Search' />
            <div
            className='scroll__categ' 
            style={{listStyleType:'none',maxWidth: '87%', overflowX:'scroll', overflowY:'hidden' ,padding: '10px', display:'flex', rowGap: '10px'}}
            >
            {/* <ConversationList className='ps'> */}
            {/* <ul  style={{listStyleType:'none',display:'flex'}}> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            {/* <li> */}
            <Button className='button__categ'>prog</Button >
            {/* </li> */}
            
            {/* </ul> */}

            {/* <div className='ps__rail-x' style={{width:'23px'}}>
              <div className='ps__thumb-x' style={{width:'23px'}}></div>
            </div> */}
      {/* </ConversationList> */}
            </div> 
            {/* end of conversation list */}

            <ConversationList className='list'>
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
            </ConversationList>
        </div>
    </div>
  )
}

export default ExpHist