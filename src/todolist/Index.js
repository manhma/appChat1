import React, { useEffect, useState } from "react";
import "./todolist.css";
import Todo from "./Todo";
import { Divider, Input } from "antd";
import { addData2, getData } from "../firebase/dataFirebase";
import { async } from "@firebase/util";
import { useSelector } from "react-redux";

export default function TodoPage() {
  const myUser = useSelector((state) => state.checkAuth.user);
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState("");
  const [dep, setDep] = useState();
  useEffect(async () => {
    const a = await getData("todos");
    setTodos(a);
  }, [dep]);
  const handleAddTodo = () => {
    addData2("todos", `${new Date().getTime()}`, {
      uid: myUser.uid,
      todoId: new Date().getTime(),
      title: inputTodo,
      completed: false,
    });
    setInputTodo("");
    setDep(new Date().getTime());
  };
  return (
    <div className="todoApp">
      <h1 className="todoTitle">Todolist</h1>
      <div className="wrapper">
        <div className="topCenter">
          <div className="plus">+</div>
          <Input
            bordered={false}
            size="large"
            className="addInput"
            placeholder="Nhập việc cần làm . . ."
            value={inputTodo}
            onChange={(e) => setInputTodo(e.target.value)}
            onPressEnter={handleAddTodo}
          />
        </div>
        <Divider />
        <div className="todoWrapper">
          {todos.map((todo, index) => {
            return (
              <Todo
                todo={todo}
                key={index}
                todos={todos}
                setTodos={setTodos}
                setDep={setDep}
              />
            );
          })}
        </div>
        <div className="filterTodo">
          <div>Còn 7 việc</div>
          <div className="filterBtns">
            <div className="filterBtn">Tất cả</div>
            <div className="filterBtn">Chưa làm</div>
            <div className="filterBtn">Đã làm</div>
          </div>
          <div>Xóa việc đã làm</div>
        </div>
      </div>
    </div>
  );
}
