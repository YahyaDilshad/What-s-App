import React from 'react'
import {Users} from 'lucide-react'
const SidebarSkeleton = () => {
    const skeletonArray = Array(8).fill(null);
  return (
    <aside className='bg-gray-900  border-r border-gray-600 w-20 py-4  h-full fixed top-0 left-0 right-0 z-10'>
    {/* {Header} */} 
    <div className='border-b border-gray-600 p-2 '>
        <div className='flex items-center gap-4'>
            <Users className='text-gray-500 h-4 w-4' />
            <div className='font-medium hidden lg-block'>Contact</div>
        </div>
       {/* Skeleton */}
       {skeletonArray.map((_, index) => (
           <div key={index} className='animate-pulse flex items-center gap-4 p-2'>
              <div className='bg-gray-700 h-8 w-8 rounded-full'></div>
               <div className='hidden lg-block text-left min-w-0 flex-1'>
                <div className='skeleton h-4 w-32 mb-2'></div>
                <div className='skeleton h-4 w-16'></div>
               </div>
           </div>
       ))}
    </div>
    </aside>
  )
}

export default SidebarSkeleton