import React, { useEffect } from 'react'
import { messageauthstore } from '../store/messageauthstore'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
  


const Chatmessage = () => {
  const { messages, getMessages, isMessageLoading, SelectedUser } = messageauthstore()

  
  useEffect(() => {
    if (!SelectedUser?._id) return;
    getMessages(SelectedUser._id)
  }, [getMessages, SelectedUser?._id])
  
  if (!SelectedUser) return null
  if (isMessageLoading) return <>Loading....</>
  return (
<div className='flex w-[64%] flex-col flex-1 overflow-hidden'>
  <ChatHeader/>
  
  <ChatInput/>
</div>
  
  )
}

export default Chatmessage