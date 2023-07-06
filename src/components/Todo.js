import React, { useState } from "react";
import {
  RiArrowDownCircleLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
} from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { removeTodo, updateIsDone, updateshowDescription } from "../api/api";
import TodoForm from "./TodoForm";

const Todo = ({ todos, setTodos }) => {
  const [edit, setEdit] = useState({});
  const [clickedIcon, setClickedIcon] = useState("");

  const handleRemove = async (id) => {
    await removeTodo(id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const completeTodo = (id) => {
    try {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      });

      updateIsDone(id, !todos.find((todo) => todo.id === id).isDone);
      setTodos(newTodos);
      setClickedIcon("complete");
    } catch (error) {
      console.log(error);
    }
  };

  const showDescription = (id) => {
    try {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            showDescription: !todo.showDescription,
          };
        }
        return todo;
      });

      updateshowDescription(
        id,
        !todos.find((todo) => todo.id === id).showDescription
      );
      setTodos(newTodos);
      setClickedIcon("show");
    } catch (error) {
      console.log(error);
    }
  };

  if (edit.id) {
    return (
      <TodoForm
        edit={edit}
        todos={todos}
        setTodos={setTodos}
        setEdit={setEdit}
      />
    );
  }

  return todos.map((todo, index) => (
    <>
      <div
        className={todo.isDone ? "todo-row complete" : "todo-row"}
        key={index}
      >
        <div className="description">
          <div
            key={todo.id}
            onClick={() => completeTodo(todo.id)}
            className="todo"
          >
            {todo.title}
          </div>
          <div className="icons">
            <RiCheckboxCircleLine
              onClick={() => completeTodo(todo.id)}
              className={`delete-icon ${
                clickedIcon === "complete" ? "clicked" : ""
              }`}
            />
            <RiArrowDownCircleLine
              onClick={() => showDescription(todo.id)}
              className={`delete-icon ${
                clickedIcon === "show" ? "clicked" : ""
              }`}
            />
            <RiCloseCircleLine
              onClick={() => handleRemove(todo.id)}
              className={`delete-icon ${
                clickedIcon === "delete" ? "clicked" : ""
              }`}
            />
            <TiEdit
              onClick={() =>
                setEdit({
                  id: todo.id,
                  value: todo.title,
                  description: todo.description,
                  url: todo.url,
                })
              }
              className={`edit-icon ${clickedIcon === "edit" ? "clicked" : ""}`}
            />
          </div>
        </div>
        {todo.showDescription && (
          <div className="todo-row-date">
            <div>
              <p>Fecha de creación:</p>
              <p>
                {new Date(todo.data_time)
                  .toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(",", " /")}
              </p>
            </div>
            <div>
              <p>Fecha de edición:</p>
              <p>
                {new Date(todo.data_time_edit)
                  .toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(",", " /")}
              </p>
            </div>
          </div>
        )}
        {todo.showDescription && (
          <div
            onClick={() => completeTodo(todo.id)}
            className="description-todo"
          >
            {todo.description}
          </div>
        )}
        {todo.showDescription && (
          <div
            className="img"
            style={{
              backgroundImage: `url(${todo.url})`,
              width: "min(500px,100%)",
              height: "min(300px)",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
            onClick={() => completeTodo(todo.id)}
          ></div>
        )}
      </div>
    </>
  ));
};

export default Todo;
