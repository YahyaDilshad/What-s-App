// src/store/useauthstore.js
import { create } from "zustand";
import axiosinstace from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = 'http://localhost:4000';

const useAuthStore = create((set, get) => ({
  authuser: null,
  isCheckingAuth: true,
  isAuthenticated: false,
  isloggedin: false,
  isupdatingprofile: false,
  issignup: false,
  connectedSocket: null,
  // list of online user IDs (kept for compatibility with components that expect IsonlineUsers)
  IsonlineUsers: [],
  // map of userId -> last seen timestamp (ms since epoch) for offline users or when provided by server
  lastSeenMap: {},


  // Check authentication
  checkauth: async () => {
    try {
      const response = await axiosinstace.get("/auth/check");
      set({
        authuser: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
      // Connect socket after successful auth check
      get().connectSocket();
    } catch (error) {
      set({
        authuser: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },

  // Signup
  signup: async (formdata) => {
    set({ isSignup: true });
    try {
      const response = await axiosinstace.post("/auth/signup", formdata);
      set({ authuser: response.data.user });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Signup failed");
    } finally {
      set({ isSignup: false });
    }
  },

  // Login
  login: async (formdata) => {
    try {
      const response = await axiosinstace.post('/auth/login', formdata);
      const user = response.data.user
      set({
        authuser: user,
        isAuthenticated: true,
        isloggedin: true,
      });
      get().connectSocket();

      return user
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Login failed");
    }
  },

  // Logout
  logout: async () => {
    try {
      
      await axiosinstace.post("/auth/logout");
      set({ authuser: null, isAuthenticated: false, isloggedin: false });
      toast.success(" Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Logout failed");
    }
  },

  // Connect socket
  connectSocket: () => {
  const authuser = get().authuser;
  if (!authuser) return;

  // Disconnect existing socket if any
  const existingSocket = get().connectedSocket;
  if (existingSocket && existingSocket.connected) {
    existingSocket.disconnect();
  }

  const socket = io(BASE_URL, {
    query: { userId: authuser._id },
    autoConnect: true,
  });

  console.log("✅ Socket connecting for user:", authuser._id);

  set({ connectedSocket: socket });

  // Handle connection events
  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });

  // Handle online users updates
  socket.on("getOnlineUsers", (payload) => {
    // payload shape may vary depending on server implementation:
    // - array of userId strings: ["id1","id2"]
    // - array of objects: [{ userId: 'id', lastSeen: 169... }, ...]
    // - object map: { userId: lastSeenTimestamp }
    try {
      console.log("📡 Online users received:", payload);

      let ids = [];
      const lastSeenMap = { ...get().lastSeenMap };

      if (Array.isArray(payload)) {
        if (payload.length > 0 && typeof payload[0] === 'object') {
          // array of objects
          payload.forEach((item) => {
            const id = item.userId || item.id || item._id;
            if (id) ids.push(id);
            if (item.lastSeen) lastSeenMap[id] = item.lastSeen;
          });
        } else {
          // array of ids
          ids = payload.slice();
        }
      } else if (payload && typeof payload === 'object') {
        // object map { userId: lastSeen }
        ids = Object.keys(payload);
        Object.entries(payload).forEach(([id, ts]) => {
          if (ts) lastSeenMap[id] = ts;
        });
      }

      // For any users that were previously online but now absent, set their lastSeen to now
      const prevOnline = get().IsonlineUsers || [];
      prevOnline.forEach((prevId) => {
        if (!ids.includes(prevId)) {
          // mark last seen time if not already set
          if (!lastSeenMap[prevId]) lastSeenMap[prevId] = Date.now();
        }
      });

      set({ IsonlineUsers: ids, lastSeenMap });
    } catch (err) {
      console.error('Failed to parse getOnlineUsers payload', err);
    }
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });
},

  // Disconnect socket
  disconnectSocket: () => {
    const socket = get().connectedSocket;
    if (socket && typeof socket.disconnect === "function") {
      socket.disconnect();
      console.log("❌ Socket disconnected");
      set({ connectedSocket: null });
    } else {
      console.warn("⚠️ No valid socket to disconnect:", socket);
    }
  },
}));

export default useAuthStore;
