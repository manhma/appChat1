import { async } from "@firebase/util";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedRoom } from "../actions/roomSelectedData";

export default function SidebarElement({ roomInf }) {
  const myUser = useSelector((state) => state.checkAuth.user);
  const users = useSelector((state) => state.chatData.users);
  const roomSelectedId = useSelector((state) => state.roomData.roomid);
  const [displayUser, setDisplayUser] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const displayUserId = roomInf.uid.filter((id) => {
      return id != myUser.uid;
    });
    if (roomInf.uid.length == 2) {
      const [a] = users.filter((user) => {
        return user.uid == displayUserId[0];
      });
      setDisplayUser(a);
    } else {
      setDisplayUser(roomInf);
    }
  }, []);
  const handleSelectRoom = () => {
    dispatch(selectedRoom(roomInf.id, displayUser));
  };
  const roomStyle =
    roomInf.id == roomSelectedId ? { backgroundColor: "#e4e6eb" } : {};

  return (
    <div
      onClick={handleSelectRoom}
      className="sidebarElement"
      style={roomStyle}
    >
      <div style={{ display: "flex" }}>
        <Avatar size={50} src={displayUser.photoURL}>
          {displayUser.roomName}
        </Avatar>
        <div className="contentSidebarElememt">
          <div className="displayName">
            {displayUser.displayName || displayUser.roomName}
          </div>
          <div>{roomInf.lastMessage}</div>
        </div>
      </div>
      <div className="timeAgo">2h</div>
    </div>
  );
}
