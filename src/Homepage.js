import React from "react";
import { signOut } from "firebase/auth";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase/config";
import { useSelector } from "react-redux";
import { Avatar, Dropdown, Menu } from "antd";
import { MessageOutlined, CheckSquareOutlined } from "@ant-design/icons";
import TodoPage from "./todolist/Index";

export default function Homepage() {
  const navigate = useNavigate();
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
        style={{ width: "65px", height: "100vh", backgroundColor: "#0091ff" }}
      >
        <div>
          <Dropdown overlay={logOutBtn} trigger={["click"]}>
            <Avatar
              style={{
                margin: "30px 0 10px 0",
                border: "1px solid white",
              }}
              size={50}
              src={user.photoURL}
            />
          </Dropdown>
        </div>
        <div
          className="navElement"
          onClick={() => {
            navigate("/");
          }}
        >
          <MessageOutlined style={{ margin: "20px 20px" }} />
        </div>
        <div
          className="navElement"
          onClick={() => {
            navigate("/todo");
          }}
        >
          <CheckSquareOutlined style={{ margin: "20px 20px" }} />
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <Outlet />
        {/* <ChatRoom /> */}
        {/* <TodoPage /> */}
      </div>
    </div>
  );
}
