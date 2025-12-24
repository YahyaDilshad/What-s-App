import React, { useEffect ,useState } from "react";
import { messageauthstore } from "../store/messageauthstore.js";
import useAuthStore from "../store/useauthstore.js";
import SidebarSkeleton from "./SidebarSkeleton.jsx";
import { CheckSquare, Edit2, Group, MoreVertical, Star } from 'lucide-react';

const ChatHeader = () => {
  const [menuVisible, setMenuVisible] = useState(false); // menu show/hide state
  const {
    SelectedUser,
    users,
    getUsers,
    isUserLoading,
  } = messageauthstore();

  const { IsonlineUsers, authuser } = useAuthStore();
  const { lastSeenMap } = useAuthStore();
 
  const toggleMenu = () => {
    setMenuVisible(prev => !prev ); // toggle menu on click prev work like a toggle 
    
  };

  // Get current user from auth store or localStorage
  const currentUser = authuser || JSON.parse(localStorage.getItem("chat-user"));
  const currentUserId = currentUser?._id || currentUser?.id;

  useEffect(() => {
    if (SelectedUser?._id || SelectedUser?.id) {
      getUsers(SelectedUser._id || SelectedUser.id);
    }
  }, [getUsers, SelectedUser?._id, SelectedUser?.id]);

  if (isUserLoading) return <SidebarSkeleton />;

  // Check if selected user is online using socket data
  const selectedId = SelectedUser?._id || SelectedUser?.id;
  const isOnline = selectedId && IsonlineUsers && IsonlineUsers.includes(selectedId);

  const formatLastSeen = (ts) => {
    if (!ts) return "";
    const d = new Date(ts);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return `Last seen ${diff}s ago`;
    if (diff < 3600) return `Last seen ${Math.floor(diff/60)}m ago`;
    if (diff < 86400) return `Last seen ${Math.floor(diff/3600)}h ago`;
    return `Last seen ${d.toLocaleString()}`;
  };
  return (
    <div className=" flex items-center justify-between bg-[#161717] h-20 ">
      <div className="  w-full">
          <div className="overflow-y-auto flex gap-3 max-h-[80vh] space-y-2">
            <div className="relative ml-5">
           <img
             className="object-cover h-8 w-8 rounded-full"
             src={
               SelectedUser.image ||
               "https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg"
             }
             alt={SelectedUser.fullname?.firstname}
           />
           {isOnline && (
             <div className="h-3 w-3 bg-green-500 rounded-full absolute top-0 right-0 border-2 border-gray-900"></div>
           )}
         </div>
         <div className="hidden lg:block text-left min-w-0 flex-1">
           <div className="flex gap-1">
             <div className="font-medium truncate">
               {SelectedUser.fullname?.firstname}
             </div>
             <div className="font-medium truncate">
               {SelectedUser.fullname?.lastname}
             </div>
           </div>
           <div className="text-sm text-gray-500 truncate">
             {isOnline ? (
               "Online"
             ) : (
               // show last seen if available
               formatLastSeen(lastSeenMap && lastSeenMap[selectedId]) || "Offline"
             )}
           </div>
                    </div>
          </div>
      </div>
      <div className='w-fit mr-5  '>

              <MoreVertical onClick={toggleMenu} className='text-white h-6 w-5 cursor-pointer' />
              
              {menuVisible && (
                <div className={`absolute w-50 flex flex-col translate-x-0 z-10 top-13 right-8  transition-all ease-in duration-200  bg-gray-800 rounded-md shadow-lg p-2`}>

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
                  <button className='text-white border-t border-t-gray-600 block px-4 py-2 text-sm cursor-pointer'>
                    Logout
                  </button>
                </div>
              )}
      </div>
    </div>
  );
};

export default ChatHeader;
