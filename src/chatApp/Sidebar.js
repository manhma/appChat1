import React, { useEffect, useState } from "react";
import {
  UserAddOutlined,
  UsergroupAddOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./chatApp.css";
import { Avatar, Divider, Input } from "antd";
import SidebarElement from "./SidebarElement";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { getData } from "../firebase/dataFirebase";

export default function Sidebar() {
  const myUser = useSelector((state) => state.checkAuth.user);
  const rooms = useSelector((state) => state.chatData.rooms);
  return (
    <div className="sideBar">
      <div className="topSidebar">
        <div className="topSidebar1">
          <h1 style={{ margin: "0 0 0 10px", fontWeight: "bold" }}>Chat</h1>
          <div>
            <Avatar size={34} icon={<UserAddOutlined />} />
            <Avatar size={34} icon={<UsergroupAddOutlined />} />
          </div>
        </div>
        <div className="searchInput">
          <Input placeholder="Tim kiem" prefix={<SearchOutlined />} />
        </div>
      </div>
      <div className="contentSidebar">
        <div className="scrollTest">
          {rooms.map((room) => {
            if (room.uid.includes(myUser.uid)) {
              return <SidebarElement key={room.id} roomInf={room} />;
            } else {
              return;
            }
          })}
        </div>
      </div>
    </div>
  );
}
