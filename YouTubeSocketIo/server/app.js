import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const secretKeyJWT = "asdasdsadasdasdasdsa";
const port = 3000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {  // You have to run this api in the same browser not in different browser ?
  const token = jwt.sign({ _id: "asdasjdhkasdasdas" }, secretKeyJWT);

  res
    .cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
    .json({
      message: "Login Success",
    });

});


//Authentication
io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, (err) => {
    if (err) return next(err);

    const token = socket.request.cookies.token;
    if (!token) return next(new Error("Authentication Error"));

    const decoded = jwt.verify(token, secretKeyJWT);
    next();
  });
});


io.on("connection", (socket) => {
    console.log("User Connected  ", socket.id);

    // socket.emit( "welcome",`welocme to the socekt server id from backend with id ${socket.id}`); // it will got to everyone

    // socket.broadcast.emit("exceptme",`except me from backend my id is ${socket.id}`); // this will also go to everyone except the client calls this broadcast emit


    socket.on("message", (data) => { // getting message from frontend one user then logic
        console.log("message got from fontend", data);
        // io.emit("recieve-message-everyone",data); // seding it to everyone using io.emit 
        socket.broadcast.emit("everyone-except-sender", (data)); // sending to everyone except sender
    })

    // sending only those who have the same room 
    socket.on("room-message", (data) => {
        console.log("room messgae ", data);
        // socket.to(data.room).emit will also work same 
        io.to(data.roomName).emit("room-message-recieve", (data.message)); // only particular person will reiciver message and if room==socket.id of that person
        // here if everyone joined the same room then reciever will also get message
    })

    socket.on("group-send", (data) => {
        console.log("group message recieve", data);  // here reciver will not get the message
        socket.to(data.roomName).emit("group-message-recieve", data.message);// Send to everyone in the room except the sender:
    });

    //user joinint room
    socket.on("Join-group", (room) => {
        console.log("room joined", room);
        socket.join(room);
    })

    socket.on("disconnect", () => {
        console.log("user Disconnect", socket.id);
    })
})

server.listen(port, () => {
    console.log("app is running on port", port);
})