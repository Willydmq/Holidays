import React, { useEffect, useState } from "react";
import { getTodos } from "../api/api";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function TodoList() {
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosData = await getTodos();
        setTodos(todosData);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  // Resto del código aquí

  return (
    <>
      <h1>Tu lista de Vacaciones</h1>
      <TodoForm todos={todos} setTodos={setTodos} />
      <Todo todos={todos} setTodos={setTodos} />
    </>
  );
}

export default TodoList;
