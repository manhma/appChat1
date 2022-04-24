import { useSelector } from "react-redux";

import Todo from "./Todo";

export default function ListTodo() {
  const todoList = useSelector((state) => state.todo.list);
  return (
    <div className="todoWrapper">
      {todoList.map((todo, index) => {
        return <Todo todo={todo} key={index} />;
      })}
    </div>
  );
}
