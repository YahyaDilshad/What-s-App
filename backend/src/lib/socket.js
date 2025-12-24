import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const HttpServer = http.createServer(app);

const UsersocketMap = {}; // userId -> socketId

const io = new Server(HttpServer, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  
  if (userId) {
    UsersocketMap[userId] = socket.id;
    console.log(`✅ User ${userId} connected with socket ${socket.id}`);
  } else {
    console.log("⚠️ Socket connected without userId");
  }

  // Send updated list to everyone
  io.emit('getOnlineUsers', Object.keys(UsersocketMap));
  console.log("📡 Online users:", Object.keys(UsersocketMap));

  socket.on('disconnect', () => {
    if (userId && UsersocketMap[userId]) {
      delete UsersocketMap[userId];
      console.log(`❌ User ${userId} disconnected`);
    }
    // Send updated list to everyone
    io.emit('getOnlineUsers', Object.keys(UsersocketMap));
    console.log("📡 Updated online users:", Object.keys(UsersocketMap));
  });
});

export { app, HttpServer, io };
