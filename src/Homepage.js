import React from "react";
import ChatRoom from "./chatApp";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase/config";
import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { Avatar, Dropdown, Menu } from "antd";
import { MessageOutlined } from "@ant-design/icons";

export default function Homepage() {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const user = useSelector((state) => state.checkAuth.user);

  const logOutBtn = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={handleSignOut}>Đăng xuất</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ display: "flex" }}>
      <div
        className="navHomepage"
        style={{ width: "65px", backgroundColor: "#0091ff" }}
      >
        <Dropdown overlay={logOutBtn} trigger={["click"]}>
          <Avatar
            style={{ margin: "10px 0 0 5px", border: "1px solid white" }}
            size={50}
            src={user.photoURL}
          />
        </Dropdown>
        {/* <MessageOutlined /> */}
      </div>
      <div style={{ width: "100%" }}>
        <ChatRoom />
      </div>
      {/* <button onClick={handleSignOut}>log Out</button> */}
    </div>
  );
}
