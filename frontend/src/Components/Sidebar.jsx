import React from 'react'
import {Link } from 'react-router-dom';
import { MessageSquare , Settings , Tv , CircleDot ,User , UsersRound } from 'lucide-react';
import Chat from '../Components/Chat'
const Sidebar = () => {

  const handleprofile = ()=>{
    <Link to = '/profile'/>
  }
  const openchat = () =>{
    <Chat/>
  }
  return (
    <div className='bg-[#1D1F1F]   border-r border-gray-600 w-fit py-4  h-screen fixed top-0 left-0 right-0 z-99'>
      <div className='flex flex-col items-center justify-between  h-screen '>
        <div className='flex flex-col cursor-pointer gap-2 items-center'>
          <div className="flex flex-col items-center  bg-gray-900  ">
            
          <div className="relative group">
        <MessageSquare className='text-white hover:text-purple-500 h-12 w-12 p-3 ' /> 
        {/* Tooltip */}
        <div onClick={openchat} className="absolute left-12 top-1/2 -translate-y-1/2  px-2 py-1 bg-gray-400 text-black text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Message
        </div>
      </div>
        
      {/* Status Icon with Tooltip */}
      <div className="relative group">
        <CircleDot className="text-white hover:text-purple-500 h-12 w-12 p-3" />
        {/* Tooltip */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2  px-2 py-1 bg-gray-400 text-black text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Status
        </div>
      </div>
    </div>
    <div className="relative group">
        <Tv className='text-white hover:text-purple-500  h-12 w-12 p-3 ' />
        {/* Tooltip */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-400 text-black text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Channels
        </div>
      </div>
       <div className="relative group ">
         <UsersRound className='text-white hover:text-purple-500  h-12 w-12 p-3 ' />
        {/* Tooltip */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-400 text-black text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Communities
        </div>
      </div>
    </div>

        <div className='flex items-center justify-center mb-10'>

          <div className=" flex flex-col gap-5 items-center cursor-pointer ">
        <div className="relative group">
         <Settings className='text-white hover:text-purple-500 ' />
        {/* Tooltip */}
       <div className="absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-400 text-black text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Settings
        </div>
      </div>
<div className="relative group">
         <User className='text-white hover:text-purple-500 ' />
        {/* Tooltip */}
       <div onClick={handleprofile} className="absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-400 text-black text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Profile
        </div>
      </div>
          </div>
        </div>
      </div>
</div>   
  )
}

export default Sidebar