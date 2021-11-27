import React from "react";

import "./styles.css";

export default function Message({ item }) {
  const user = JSON.parse(localStorage.getItem("profile"));

  if (user.result._id !== item.id) {
    return (
      <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark">{item.message}</p>
        </div>
        <p className="sentText pl-10">{item.name}</p>
      </div>
    );
  }
  return (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{item.name}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{item.message}</p>
      </div>
    </div>
  );
}
