import React, { useRef, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsArrowDown, BsPlusCircleFill } from "react-icons/bs";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { addTodo, updateTodo } from "../api/api";

function TodoForm(props) {
  const [title, setTitle] = useState(props.edit ? props.edit.value : "");
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState(
    props.edit ? props.edit.description : ""
  );
  const [url, setUrl] = useState(props.edit ? props.edit.url : "");

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setShowDescription(!showDescription);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si los campos están vacíos
    if (!title || !description || !url) {
      alert("Por favor, llene todos los campos");
      return;
    }

    // Verificar si la URL es válida
    const urlRegex = /^(https?:\/\/|http?:\/\/)/;
    if (!urlRegex.test(url)) {
      alert("Por favor, coloque una URL correcta");
      return;
    }

    const newTodo = {
      title: title,
      description: description,
      isDone: false,
      url: url,
      showDescription: false,
    };

    try {
      const addedTodo = await addTodo(newTodo);
      props.setTodos([...props.todos, addedTodo]);
      setTitle("");
      setUrl("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  const submitUpdate = async (e) => {
    e.preventDefault();

    // Verificar si los campos están vacíos
    if (!title || !description || !url) {
      alert("Por favor, llene todos los campos");
      return;
    }

    // Verificar si la URL es válida
    const urlRegex = /^(https?:\/\/|http?:\/\/)/;
    if (!urlRegex.test(url)) {
      alert("Por favor, coloque una URL correcta");
      return;
    }

    try {
      const updatedTodo = {
        title: title,
        description: description,
        url: url,
        data_time_edit: new Date(),
      };
      const updatedTodos = props.todos.map((todo) => {
        if (props.edit.id === todo.id) {
          updateTodo(props.edit.id, updatedTodo);
        }
        return todo;
      });
      props.setTodos(updatedTodos);
      setTitle("");
      setUrl("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="todo-form">
      {props.edit ? (
        <div className="todo-form--update">
          <input
            placeholder="Update your item"
            value={title}
            onChange={handleChange}
            name="title"
            ref={inputRef}
            className="todo-input edit todo-description"
          />
          <input
            placeholder="Update your url"
            value={url}
            onChange={handleUrl}
            name="url"
            className="todo-input edit todo-description"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            name="description"
            className="todo-input todo-description"
          />
          <button onClick={handleClick} className="todo-button edit">
            <AiFillHome />
          </button>
          <button onClick={submitUpdate} className="todo-button edit">
            <RiCheckboxCircleLine />
          </button>
        </div>
      ) : (
        <>
          <input
            placeholder="Add a todo"
            value={title}
            onChange={handleChange}
            name="title"
            className="todo-input"
            ref={inputRef}
          />
          <button
            onClick={handleDescription}
            className="todo-button"
            id="description"
          >
            <BsArrowDown />
          </button>
          <button onClick={handleSubmit} className="todo-button add">
            <BsPlusCircleFill />
          </button>
          {showDescription && (
            <input
              placeholder="Update your url"
              value={url}
              onChange={handleUrl}
              name="url"
              className="todo-input edit todo-description"
            />
          )}
          {showDescription && (
            <textarea
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
              name="description"
              className="todo-input todo-description"
            />
          )}
        </>
      )}
    </form>
  );
}

export default TodoForm;
