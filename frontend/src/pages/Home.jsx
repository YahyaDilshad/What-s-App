import React from 'react'
import { messageauthstore } from "../store/messageauthstore.js";
import Chat from '../Components/Chat.jsx';
import NoselectedUserPage from '../Components/NoselectedUserPage.jsx';
import ChatMessages from '../Components/Chatmessage.jsx';

const Home = () => {
  
  const { SelectedUser } = messageauthstore()
  return (
    <div className='w-full h-screen flex flex-row  relative bg-[#161717]'>
     <Chat/>
     {!SelectedUser ? <NoselectedUserPage/> : <ChatMessages/>}
    </div>
  )
}

export default Home