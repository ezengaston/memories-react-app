import React from "react";
import useStyles from "./styles";
import Message from "./Message/Message";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Messages({ messages }) {
  const classes = useStyles();
  return (
    <ScrollToBottom className={classes.messagesScroll}>
      <div className={classes.messages}>
        {messages[0]?.map((item, i) => {
          return <Message key={i} item={item} />;
        })}
      </div>
    </ScrollToBottom>
  );
}
