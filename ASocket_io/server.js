import express from "express";
import http from "http";
import { SocketServer } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://127.0.0.1:5500", 
  }
});

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.emit("server_message", "Welcome to the socket server!");

//   socket.on("client_message", (message) => {
//     console.log("Client says:", message);

//     // Respond back
//     socket.emit("server_message", `SocketServer received: "${message}"`);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });


// Create a namespace called "/socket" 
const socketNamespace = io.of("/socket"); // now this will work on this api

socketNamespace.on("connection", (socket) => {
  console.log("Client connected to /socket:", socket.id);

  socket.emit("server_message", "Hello from /socket namespace!");

  socket.on("client_message", (msg) => {
    console.log("Client says:", msg);
    socket.emit("server_message", `Echo from /socket: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected from /socket:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("SocketServer is running on port 3000");
});
