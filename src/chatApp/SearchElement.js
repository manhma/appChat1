import { Avatar } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { selectedRoom } from "../actions/roomSelectedData";
import { addData } from "../firebase/dataFirebase";

export default function SearchElement({ user, rooms, myUser, setSearchInput }) {
  const dispatch = useDispatch();

  const twoPeopleRooms = rooms.filter((room) => {
    return room.uid.length == 2;
  });
  const handleUser = () => {
    const roomInf = twoPeopleRooms.filter((room) => {
      return (
        (user.uid == room.uid[0] && myUser.uid == room.uid[1]) ||
        (user.uid == room.uid[1] && myUser.uid == room.uid[0])
      );
    });
    if (roomInf.length != 0) {
      dispatch(selectedRoom(roomInf[0].id, user));
      setSearchInput("");
    } else {
      addData("chatRoom", {
        lastMessage: "",
        uid: [myUser.uid, user.uid],
      });
      setSearchInput("");
    }
  };
  return (
    <div onClick={handleUser} className="sidebarElement">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar size={50} src={user.photoURL} />
        <div className="contentSidebarElememt">
          <div className="displayName">{user.displayName}</div>
        </div>
      </div>
    </div>
  );
}
