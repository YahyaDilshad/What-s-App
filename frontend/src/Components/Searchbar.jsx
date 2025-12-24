import React from 'react'
import {Search} from 'lucide-react';
const Searchbar = () => {
  return (
    <>
    <div className=' w-100 border h-fit flex items-center px-2 gap-2 rounded-md mt-3  bg-gray-700 border-none absolute top-16 left-3 right-0   '>
      <Search className='text-white  h-4 w-4 cursor-pointer ' />
      <input type="text" className=' w-full text-white outline-none p-2 ' placeholder='Search...' />
      </div>
      <div className='absolute z-10 top-30  '>
        <button className='text-white mx-2 my-1.5 text-[12px] px-4 py-1 rounded-full border-1 border-gray-600 hover:bg-gray-700 transition-all ease-in  '  >All</button>
        <button className='text-white mx-1 my-1.5 text-[12px] px-3 py-1 rounded-full border-1 border-gray-600 hover:bg-gray-700 transition-all ease-in  '  >Unread</button>
        <button className='text-white mx-1 my-1.5 text-[12px] px-3 py-1 rounded-full border-1 border-gray-600 hover:bg-gray-700 transition-all ease-in  '  >Favorites</button>
        <button className='text-white mx-1 my-1.5 text-[12px] px-3 py-1 rounded-full border-1 border-gray-600 hover:bg-gray-700 transition-all ease-in  '  >Groups</button>
      </div>
    </>
  )
}

export default Searchbar