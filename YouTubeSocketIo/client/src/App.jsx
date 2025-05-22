import { Button, Container, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import Room from "./Room";

// import { useEffect, useRef } from "react";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000",{ // just writing this url use is connected to bakcend socket
      withCredentials:true
    }), 
  []); 

  const [socketid, setSocketid] = useState("");

  const [message, setMessage] = useState("");
  const [recievemessage,setrecieveMessage] = new useState(""); 
  
  const handelSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message); // removed space
    setMessage(""); // clear input after send
  };

  useEffect(() => {

    socket.on("connect", () => {
      setSocketid(socket.id);
      console.log("fontend connected", socket.id);
    });

    // socket.on("welcome",(message)=>{
    //   console.log("this is the message from welcome emit",message);
    // });

    //   socket.on("exceptme",(message)=>{
    //     console.log("broadcaset except me from forntend my id ist",` ${socket.id}  +  ${message}`);
    //   })


    // socket.on("recieve-message-everyone",(data)=>{
    //     setrecieveMessage(data);
    //     console.log("message recived :- ",recievemessage);
    // })

    
    socket.on("everyone-except-sender",(data)=>{
      setrecieveMessage(data);
      console.log("message recived :- ",recievemessage);
    })

    return () => {
      console.log("socket is disconnect from forntend", socket.id);
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h3" component="div" gutterBottom>
          Sending message only
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {socketid}
        </Typography>
      </Container>
      <form onSubmit={handelSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="massage"
          variant="outlined"
        />
        <Button variant="contained" color="primary" type="submit">
          send
        </Button>
        {/* <Text
          value={recievemessage}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        /> */}
      </form>
      <Room socket={socket} socketid={socketid}/>
    </div>
  );
};

export default App;
