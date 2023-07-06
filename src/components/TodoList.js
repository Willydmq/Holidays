import React, { useEffect, useState } from "react";
import { getTodos } from "../api/api";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const todosData = await getTodos();
      setTodos(todosData);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Tu lista de Vacaciones</h1>
      <TodoForm todos={todos} setTodos={setTodos} />
      <Todo todos={todos} setTodos={setTodos} />
    </>
  );
}

export default TodoList;
