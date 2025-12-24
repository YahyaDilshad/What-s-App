import {create} from "zustand";
import toast from "react-hot-toast";
import axiosinstance from "../lib/axios";

export const messageauthstore = create((set) => ({
  users: [],
  messages: [],
  SelectedUser: null,
  isMessageLoading: false,
  isUserLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
    const res = await axiosinstance.get("/messages/users");

      set({ users: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosinstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setSelectedUser: (user) => set({ SelectedUser: user }),
}));
