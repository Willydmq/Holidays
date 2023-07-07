import axios from "axios";

const url = "https://holidays-aez8.onrender.com/api";

export const getTodos = async () => {
  try {
    const response = await axios.get(`${url}`);
    return response.data.data;
  } catch (error) {
    console.log("Error al obtener la lista de tareas:", error);
    throw new Error(
      "No se pudo obtener la lista de tareas. Por favor, intenta de nuevo más tarde."
    );
  }
};

export const addTodo = async (todo) => {
  try {
    const response = await axios.post(`${url}`, todo);
    return response.data.toDo;
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (id, newValue) => {
  try {
    const response = await axios.patch(`${url}/${id}`, {
      ...newValue,
    });
    return response.data.toDo;
  } catch (error) {
    console.log(error);
  }
};

export const updateIsDone = async (id, isDone) => {
  try {
    const response = await axios.patch(`${url}/${id}`, {
      isDone,
    });
    console.log(response.data.toDo);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateshowDescription = async (id, showDescription) => {
  try {
    const response = await axios.patch(`${url}/${id}`, {
      showDescription,
    });
    console.log(response.data.toDo);
  } catch (error) {
    console.log(error.message);
  }
};

export const removeTodo = async (id) => {
  try {
    const response = await axios.delete(`${url}/${id}`);
    return response.data.toDo;
  } catch (error) {
    console.log(error);
  }
};
