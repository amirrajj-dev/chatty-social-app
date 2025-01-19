import { Server } from "socket.io";
import http from "http";
import express from "express";

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});



// used for keeping online users
const userSocketMap = {};

export function getReceiverSocketId(userId){
  return userSocketMap[userId]
}


io.on("connection", (socket) => {
  console.log("A new client connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit used to send events to all online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {  // Remove 'socket' parameter
    console.log("A client disconnected", socket.id);
    const userId = Object.keys(userSocketMap).find(key => userSocketMap[key] === socket.id);
    if (userId) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});