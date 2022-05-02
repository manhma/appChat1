import React, { useEffect, useState } from "react";
import "./todolist.css";
import Todo from "./Todo";
import { Divider, Input } from "antd";
import { addData2, getData } from "../firebase/dataFirebase";
import { async } from "@firebase/util";
import { useSelector } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

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
  const [filterBtn, setFilterBtn] = useState(1);

  const handleDeleteCompleted = () => {
    const completedTodos = todos.filter((todo) => {
      return todo.completed == true;
    });
    completedTodos.map(async (todo) => {
      await deleteDoc(doc(db, "todos", `${todo.todoId}`));
    });
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
          {filterBtn == 1
            ? todos.map((todo, index) => {
                return <Todo todo={todo} key={index} setDep={setDep} />;
              })
            : filterBtn == 2
            ? todos
                .filter((todo) => {
                  return todo.completed == false;
                })
                .map((todo, index) => {
                  return <Todo todo={todo} key={index} setDep={setDep} />;
                })
            : todos
                .filter((todo) => {
                  return todo.completed == true;
                })
                .map((todo, index) => {
                  return <Todo todo={todo} key={index} setDep={setDep} />;
                })}
        </div>
        <div className="filterTodo">
          <div className="filterBtn">Còn {todos.length} việc</div>
          <div className="filterBtns">
            <div
              className="filterBtn"
              style={{
                border: filterBtn == 1 ? "1px solid black" : "none",
              }}
              onClick={() => setFilterBtn(1)}
            >
              Tất cả
            </div>
            <div
              className="filterBtn"
              style={{
                border: filterBtn == 2 ? "1px solid black" : "none",
              }}
              onClick={() => setFilterBtn(2)}
            >
              Chưa làm
            </div>
            <div
              className="filterBtn"
              style={{
                border: filterBtn == 3 ? "1px solid black" : "none",
              }}
              onClick={() => setFilterBtn(3)}
            >
              Đã làm
            </div>
          </div>
          <div className="filterBtn" onClick={handleDeleteCompleted}>
            Xóa việc đã làm
          </div>
        </div>
      </div>
    </div>
  );
}
