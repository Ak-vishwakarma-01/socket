import { Button, Container, Stack, TextField, Typography } from "@mui/material";
// import { useState } from "react";
// import { useEffect } from "react";
import { JoinGroup } from "./JoinGroup";

// import { useEffect, useRef } from "react";

const Room = ({ socket, socketid }) => {
  // const [message, setMessage] = useState("");
  // const [recievemessage, setrecieveMessage] = new useState([]);
  // const [room, setRoom] = useState("");

  // const handelSubmit = (e) => {
  //   e.preventDefault();
  //   socket.emit("room-message", { message, room });
  //   setMessage(""); // clear input after send
  // };

  // useEffect(() => {
  //   socket.on("room-message-recieve", (data) => {
  //     console.log("room message reciever :- ", data);
  //     setrecieveMessage((prv) => [...prv, data]);
  //   });

  //   return () => {
  //     socket.off("room-message-recieve");
  //   };
  // }, []);

  return (
    <div>
      {/* <Container maxWidth="sm">
        <Typography variant="h3" component="div" gutterBottom>
          Room massages
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
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="room"
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
      </form> */}
      <JoinGroup socket={socket}  socketid={socketid}/>
    </div>
  );
};

export default Room;
