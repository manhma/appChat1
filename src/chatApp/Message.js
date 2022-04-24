import { Avatar } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

export default function Message({ message, myUser }) {
  const users = useSelector((state) => {
    return state.chatData.users;
  });
  const user = users.find((user) => {
    return user.id == message.uid;
  });

  const messStyle =
    message.uid == myUser.uid
      ? { alignSelf: "flex-end", flexDirection: "row-reverse" }
      : {};
  const contentMessStyle =
    message.uid == myUser.uid ? { backgroundColor: "#e5efff" } : {};
  return (
    <div className="message" style={messStyle}>
      <Avatar size={40} src={user?.photoURL} style={{ minWidth: "40px" }} />
      <div className="contentMessage" style={contentMessStyle}>
        <div>{message.messageContent}</div>
        {/* <div className="messageTime">{messTime}</div> */}
        <div className="messageTime">
          {message.timestamp &&
            moment(message.timestamp.seconds * 1000).format("HH:mm DD/MM/YYYY")}
        </div>
      </div>
    </div>
  );
}
