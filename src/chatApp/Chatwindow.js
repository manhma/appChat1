import { Avatar, Button, Form, Input, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { VideoCameraOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Message from "./Message";
import { useSelector } from "react-redux";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import { addData1 } from "../firebase/dataFirebase";

export default function Chatwindow() {
  const myUser = useSelector((state) => state.checkAuth.user);
  const roomInf = useSelector((state) => state.roomData);
  const roomInfLength = Object.keys(roomInf).length;
  const [messageOfRoom, setMessageOfRoom] = useState([]);

  // console.log("roomInf: ", roomInf);
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    const unsub3 = onSnapshot(q, (snapShot) => {
      const data = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const a = data.filter((message) => {
        return message.roomid == roomInf.roomid;
      });
      setMessageOfRoom(a);
      return () => {
        unsub3();
      };
    });
  }, [roomInf]);
  const [input, setInput] = useState("");
  const handleAddMess = () => {
    if (input.trim().length !== 0) {
      addData1("messages", {
        uid: myUser.uid,
        roomid: roomInf.roomid,
        messageContent: input.trim(),
      });
    }
    setInput("");
  };

  // const messagesEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   console.log("messageOfRoom: ", messageOfRoom);
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(scrollToBottom, [messageOfRoom]);
  return (
    <>
      {roomInfLength === 0 ? (
        <div>HEEH XIN CHAO</div>
      ) : (
        <div className="chatWindow">
          <div className="topChatWindow">
            <div className="topChatLeft">
              <Avatar size={50} src={roomInf.displayUser.photoURL} />
              <div className="displayInf">
                <div className="displayName">
                  {roomInf.displayUser.displayName ||
                    roomInf.displayUser.roomName}
                </div>
                <div>hoat dong 1p truoc</div>
              </div>
            </div>
            <div className="topChatRight">
              <VideoCameraOutlined />
              <InfoCircleOutlined />
            </div>
          </div>
          <div className="contentChatWindow">
            <div className="listMessage">
              {messageOfRoom.map((message) => {
                return (
                  <Message key={message.id} message={message} myUser={myUser} />
                );
              })}
              {/* <div ref={messagesEndRef} /> */}
            </div>
          </div>
          <div className="chatting">
            <Input
              className="chatBox"
              placeholder="Aa"
              bordered={false}
              style={{ marginRight: "5px" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={handleAddMess}
            />
            <Button type="primary" onClick={handleAddMess}>
              Gửi
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
