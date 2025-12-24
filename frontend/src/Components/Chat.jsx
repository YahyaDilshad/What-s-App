import React, { useEffect } from "react";
import Navbar from "./Navbar.jsx";
import Searchbar from "./Searchbar.jsx";
import SidebarSkeleton from "./SidebarSkeleton.jsx";
import { messageauthstore } from "../store/messageauthstore.js";
import useAuthStore from "../store/useauthstore.js";

const Chat = () => {
  const {
    SelectedUser,
    setSelectedUser,
    users,
    getUsers,
    isUserLoading,
  } = messageauthstore();

  const { IsonlineUsers, authuser } = useAuthStore();
  const { lastSeenMap } = useAuthStore();

  // ✅ Get current logged-in user from auth store
  const currentUser = authuser || JSON.parse(localStorage.getItem("chat-user"));
  console.log("Current User:", currentUser);
  console.log("Online Users:", IsonlineUsers);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <div className="chat border-r ml-12 relative border-gray-600 w-[33%] h-screen z-10">
      <Navbar />
      <Searchbar className="absolute left-[12.5rem] right-0 z-10" />

      <div className="border-b border-base-300 w-full p-5">
        <div className="absolute left-0 top-45 w-full">
          <div className="overflow-y-auto max-h-[80vh] space-y-2">
            {users && users.length > 0 ? (
              users.map((user) => {
                // ✅ Check if user is online using socket data
                const userId = user._id || user.id;
                const isUserOnline = IsonlineUsers && IsonlineUsers.includes(userId);
                const formatLastSeen = (ts) => {
                  if (!ts) return "";
                  const d = new Date(ts);
                  const now = new Date();
                  const diff = Math.floor((now - d) / 1000);
                  if (diff < 60) return `${diff}s ago`;
                  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
                  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
                  return d.toLocaleString();
                };
                const isCurrentUser = currentUser && (user._id === currentUser._id || user.id === currentUser.id);

                return (
                  <button
                    key={user._id || user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`flex items-center gap-4 p-2 hover:bg-[#2E2F2F] w-full ${
                      SelectedUser?._id === user._id || SelectedUser?.id === user.id
                        ? "bg-[#2E2F2F]"
                        : "bg-[#161717]"
                    }`}
                  >
                    <div className="relative">
                      <img
                        className="object-cover h-8 w-8 rounded-full"
                        src={
                          user.image ||
                          "https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg"
                        }
                        alt={user.fullname?.firstname}
                      />

                      {/* ✅ Online/Offline dot */}
                      <div
                        className={`h-3 w-3 rounded-full absolute top-0 right-0 border-2 border-gray-900 ${
                          isUserOnline ? "bg-green-500" : "bg-gray-500"
                        }`}
                      ></div>
                    </div>

                    <div className="hidden lg:block text-left min-w-0 flex-1">
                      <div className="flex gap-1">
                        <div className="font-medium truncate">
                          {user.fullname?.firstname}
                        </div>
                        <div className="font-medium truncate">
                          {user.fullname?.lastname}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {isUserOnline ? "Online" : (formatLastSeen(lastSeenMap && lastSeenMap[userId]) || "Offline")}
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm text-center">
                No contacts found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
