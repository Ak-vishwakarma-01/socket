import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

// import { useEffect, useRef } from "react";

export const JoinGroup = ({ socket, socketid }) => {
  const [message, setMessage] = useState("");
  const [recievemessage, setrecieveMessage] = useState([]);
  const [roomName, setRoomName] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
    socket.emit("group-send", { message, roomName });
    setMessage(""); // clear input after send
  };

  const joinGroup = (e) => {
    e.preventDefault();
    socket.emit("Join-group", roomName);
    console.log("joined ", roomName);
    // setRoomName(""); // REMOVE THIS LINE
  };

  useEffect(() => {
    
    socket.on("group-message-recieve", (data) => {
        console.log("room message reciever :- ", data);
    setrecieveMessage((prv) => [...prv, data]);
  });

    return () => {
      socket.off("group-message-recieve");
    };
  }, []);

  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h3" component="div" gutterBottom>
          Joining Group Messages
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {socketid}
        </Typography>
      </Container>

      <form onSubmit={joinGroup}>
        <h5>Join Group/Room</h5>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="outlined-basic"
          label="join group"
          variant="outlined"
        />
        <Button variant="contained" color="primary" type="submit">
          Join Group
        </Button>
      </form>

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
        <div>
          <Stack padding="20px">
            {recievemessage &&
              recievemessage.map((msg, idx) => (
                <Typography key={idx} variant="body1">
                  {msg}
                </Typography>
              ))}
          </Stack>
        </div>
      </form>
    </div>
  );
};
