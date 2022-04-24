import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../actions/todo";

export default function Header() {
  const dispatch = useDispatch();
  const [inputTodo, setInputTodo] = useState("");

  return (
    <div>
      <h1 className="todoTitle">Todolist</h1>
      <div className="topCenter">
        <div className="plus">+</div>

        <input
          className="addInput"
          placeholder="What need to be done?"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch(addTodo(inputTodo));
            setInputTodo("");
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
