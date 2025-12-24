import React, { useState } from 'react';
import { CheckSquare, Edit2, Group, MoreVertical, Star } from 'lucide-react';
import useAuthStore from "../store/useauthstore.js";  


const Navbar = () => {
  const { logout } = useAuthStore();
  const [menuVisible, setMenuVisible] = useState(false); // menu show/hide state

  const toggleMenu = () => {
    setMenuVisible(prev => !prev); // toggle menu on click prev work like a toggle 
  };

  return (
    <>
      <div className=' w-fit h-16 flex items-center fixed top-0 left-10 right-0 z-10'>
        <div className='flex items-center h-full px-4'>
          <h1 className='text-white text-lg font-semibold'>WhatsApp</h1>
          <div className='flex items-center gap-3 ml-68'>
            <Edit2 className='text-white h-4 w-4 cursor-pointer' />
            <div className='relative'>
              <MoreVertical onClick={toggleMenu} className='text-white h-4 w-4 cursor-pointer' />
              
              {menuVisible && (
                <div className='absolute w-50  flex flex-col z-10 top-8 transition-all ease-in duration-200 bg-gray-800 rounded-md shadow-lg p-2'>

                  <button className='text-white flex gap-1 w-full hover:bg-gray-600 transition-all ease-in cursor-pointer px-4 py-2 text-sm'>
                    <Group className='text-gray-400' />
                    <span className='ml-2'>New Group</span>
                  </button>
                  <button className='text-white flex gap-2 w-full hover:bg-gray-600 transition-all ease-in cursor-pointer px-4 py-2 text-sm'>
                    <Star className='text-gray-400' />
                    <span>Starred Messages</span>
                  </button>
                  <button className='text-white flex w-full gap-2 hover:bg-gray-600 transition-all ease-in cursor-pointer px-4 py-2 text-sm'>
                    <CheckSquare className='text-gray-400' />
                    <span>Select Chats</span>
                  </button>
                  <button onClick={logout} className='text-white border-t border-t-gray-600 block px-4 py-2 text-sm cursor-pointer'>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;