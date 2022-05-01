import React, { useEffect, useState } from "react";
import {
  UserAddOutlined,
  UsergroupAddOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./chatApp.css";
import { Avatar, Divider, Form, Input, Modal, Select } from "antd";
import SidebarElement from "./SidebarElement";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { addData, getData } from "../firebase/dataFirebase";
import SearchElement from "./SearchElement";

export default function Sidebar() {
  const myUser = useSelector((state) => state.checkAuth.user);
  const rooms = useSelector((state) => state.chatData.rooms);
  const users = useSelector((state) => state.chatData.users);

  const [searchInput, setSearchInput] = useState("");
  const handleChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  const arrResult = users.filter((a) => {
    return a.displayName.includes(searchInput) && a.uid !== myUser.uid;
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    values.uid.push(myUser.uid);
    console.log("values: ", values);
    if (values.uid.length > 2) {
      addData("chatRoom", values);
    } else {
      alert("Lập nhóm có 2 người thì đi mà vào chat riêng");
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { Option } = Select;
  const arrUsers = users.filter((user) => {
    return user.uid != myUser.uid;
  });
  const handleChangeSelect = (values) => {
    form.setFieldsValue(values);
  };
  return (
    <div className="sideBar">
      <div className="topSidebar">
        <div className="topSidebar1">
          <h1 style={{ margin: "0 0 0 10px", fontWeight: "bold" }}>Chat</h1>
          <div>
            <Avatar size={34} icon={<UserAddOutlined />} />
            <Avatar
              size={34}
              icon={<UsergroupAddOutlined />}
              onClick={showModal}
            />
          </div>
        </div>
        <Modal
          title="Tạo nhóm chat"
          visible={isModalVisible}
          okText="Tạo phòng"
          cancelText="Hủy"
          onCancel={handleCancel}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                handleOk(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          <Form form={form}>
            <Form.Item label="Nhập tên nhóm" name="roomName">
              <Input />
            </Form.Item>
            <Form.Item label="Thêm bạn vào nhóm" name="uid">
              <Select
                mode="multiple"
                placeholder="Thêm thành viên"
                onChange={handleChangeSelect}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {arrUsers.map((a) => {
                  return (
                    <Option key={a.uid} value={a.uid}>
                      {a.displayName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <div className="searchInput">
          <Input
            onChange={handleChangeSearchInput}
            placeholder="Tim kiem"
            prefix={<SearchOutlined />}
            value={searchInput}
          />
        </div>
      </div>
      <div className="contentSidebar">
        <div className="scrollTest">
          {searchInput
            ? arrResult.map((user) => {
                return (
                  <SearchElement
                    key={user.uid}
                    user={user}
                    rooms={rooms}
                    myUser={myUser}
                    setSearchInput={setSearchInput}
                  />
                );
              })
            : rooms.map((room) => {
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
