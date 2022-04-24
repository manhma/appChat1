import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delTodo, editTodo } from "../actions/todo";

export default function Todo({ todo }) {
  const dispatch = useDispatch();
  const [editBox, setEditBox] = useState(false);
  const [editInput, setEditInput] = useState(todo.title);
  return (
    <div className="todo">
      {editBox ? (
        <div>
          <input
            className="todoContent"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
          />
          <button
            onClick={() => {
              dispatch(editTodo(todo.id, editInput));
              setEditBox(false);
            }}
          >
            done
          </button>
        </div>
      ) : (
        <>
          <input type={"checkbox"} className="check" />
          <div
            className="todoContent"
            onDoubleClick={() => setEditBox(!editBox)}
          >
            {todo.title}
          </div>
          <div className="deleteBtn" onClick={() => dispatch(delTodo(todo.id))}>
            x
          </div>
        </>
      )}
    </div>
  );
}
