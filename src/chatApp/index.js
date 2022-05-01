import { Col, Row } from "antd";
import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDataRooms, getDataUsers } from "../actions/chatData";
import { db } from "../firebase/config";
import Chatwindow from "./Chatwindow";
import Sidebar from "./Sidebar";

export default function ChatRoom() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub1 = onSnapshot(collection(db, "users"), (snapShot) => {
      const data = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(getDataUsers(data));
    });
    const unsub2 = onSnapshot(collection(db, "chatRoom"), (snapShot) => {
      const data = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(getDataRooms(data));
    });
    return () => {
      unsub1();
      unsub2();
    };
  }, []);
  return (
    <div>
      <Row>
        <Col span={6}>
          <Sidebar />
        </Col>

        <Col span={18}>
          <Chatwindow />
        </Col>
      </Row>
    </div>
  );
}
