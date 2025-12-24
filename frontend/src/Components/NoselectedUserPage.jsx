import React from 'react'
import { MessageSquare } from 'lucide-react'
const NoselectedUserPage = () => {
  return (
    <div className='flex w-[64%]  h-screen items-center justify-end '>
      <div className='w-170 rounded-xl flex-col h-200  flex items-center justify-center'>
        <MessageSquare className=' animate-bounce transition-all duration-300 text-purple-500 mb-4 h-20 w-20 p-3 rounded-md bg-gray-700 ' />
        <h2 className='text-2xl my-2 '>Welcome To What's App</h2>
        <p className=' text-lg text-gray-400 mb-4 text-center'>Select A Conversation From  SideBar And <br />    Start Chatting </p>
        </div>
    </div>
  )
}

export default NoselectedUserPage