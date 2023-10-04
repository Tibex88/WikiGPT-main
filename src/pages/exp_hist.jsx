import React from 'react'

import Header from '../components/Header'
import { Search, Button, ConversationList, Conversation, Avatar } from '@chatscope/chat-ui-kit-react'

function ExpHist({title}) {
  return (
    <div className='page'>
        <Header name={title} />
        <div className='page__wrapper'>
            <Search className='input__search' placeholder='Search' />
            {/* <div
            className='scroll__categ' 
            style={{listStyleType:'none',maxWidth: '87%', overflowX:'scroll', overflowY:'hidden' ,padding: '10px', display:'flex', rowGap: '10px'}}
            >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            <Button className='button__categ'>prog</Button >
            </div>  */}

            {/* end of conversation list */}

            <ConversationList className='list'>
{/*                
                <Conversation style={{marginTop:'8px'}} >
                <Conversation.Content> {'article.name'} </Conversation.Content>
                <Button>
                <Avatar  src={'/src/assets/icons/send-icon.png'} />
                </Button>
                </Conversation>
               
                <Conversation style={{marginTop:'8px'}} >
                <Conversation.Content> {'article.name'} </Conversation.Content>
                </Conversation>
               
                <Conversation style={{marginTop:'8px'}} >
                <Conversation.Content> {'article.name'} </Conversation.Content>
                </Conversation>
               
                <Conversation style={{marginTop:'8px'}} >
                <Conversation.Content> {'article.name'} </Conversation.Content>
                </Conversation> */}

            </ConversationList>
        </div>
    </div>
  )
}

export default ExpHist