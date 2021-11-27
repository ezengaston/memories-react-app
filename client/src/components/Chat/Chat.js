import { React, useState, useEffect } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import Messages from "./Messages/Messages";
import useStyles from "./styles";
import io from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();

let socket;

export default function Chat({ post }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const ENDPOINT = process.env.SERVER_URL;

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("join", {
      name: user.result.name,
      id: user.result._id,
      room: post._id,
    });

    return () => {
      socket.off();
    };
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("messages", ({ receivedMessages }) => {
      setMessages([receivedMessages]);
    });
  }, []);

  function handleSendMessage(e) {
    e.preventDefault();
    if (message) {
      socket.emit(
        "sendMessage",
        {
          message,
          name: user.result.name,
          id: user.result._id,
          room: post._id,
        },
        () => setMessage("")
      );
    }
  }

  return (
    <div className={classes.chatOuterContainer}>
      <Paper>
        <Messages messages={messages} />
        <TextField
          label="Message"
          className={classes.textField}
          size="medium"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
        ></TextField>
      </Paper>
    </div>
  );
}
