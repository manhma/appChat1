import { async } from "@firebase/util";
import { Divider, Input } from "antd";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase/config";

export default function Todo({ todo, setDep }) {
  const [editBox, setEditBox] = useState(false);
  const [editInput, setEditInput] = useState(todo.title);

  const handleDeleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", `${id}`));
    setDep(new Date().getTime());
  };
  const handleEditTodo = async (id) => {
    const a = doc(db, "todos", `${id}`);
    await updateDoc(a, {
      title: editInput,
    });
    setEditBox(false);
    setDep(new Date().getTime());
  };
  const handleSelected = async (id) => {
    const a = doc(db, "todos", `${id}`);
    await updateDoc(a, {
      completed: !todo.completed,
    });
    setDep(new Date().getTime());
  };
  return (
    <div>
      <div className="todo">
        {editBox ? (
          <div>
            <Input
              size="large"
              className="todoContent"
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
              onPressEnter={() => handleEditTodo(todo.todoId)}
            />
          </div>
        ) : (
          <>
            <input
              type="checkbox"
              className="check"
              checked={todo.completed}
              onChange={() => handleSelected(todo.todoId)}
            />
            <div
              style={{
                textDecorationLine: todo.completed ? "line-through" : "none",
                color: todo.completed ? "rgb(245, 195, 195)" : "black",
              }}
              className="todoContent"
              onDoubleClick={() => setEditBox(true)}
            >
              {todo.title}
            </div>
            <div
              className="deleteBtn"
              onClick={() => handleDeleteTodo(todo.todoId)}
            >
              x
            </div>
          </>
        )}
      </div>
      <Divider />
    </div>
  );
}
