import React from "react";
import Filter from "./Filter";
import Header from "./Header";
import ListTodo from "./ListTodo";
import "./todolist.css";

export default function TodoPage() {
  return (
    <div className="todoApp">
      <Header />
      <ListTodo />
      <Filter />
    </div>
  );
}
