import {
  GET_TODOS,
  CREATE_TODOS,
  UPDATE_TODOS,
  DELETE_TODOS,
  CURRENT_TODO,
  GET_TODOS_COMPLETED,
  RECREATE_TODOS,
  CREATE_COMPLETED_TODO,
  DELETE_COMPLETED_TODOS,
} from "../actionTypes";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
axios.defaults.baseURL = "http://127.0.0.1:1234";

export const getTodos = () => async (dispatch) => {
  try {
    const response = await axios.get("/todos", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    console.log(response);
    dispatch({ type: GET_TODOS, payload: response.data });
  } catch (err) {
    console.log(err);
    toast.error(err.response.data, { autoClose: 2000 });
  }
};

export const getTodosCompleted = () => async (dispatch) => {
  try {
    const response = await axios.get("/todos/completed", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    console.log(response);
    dispatch({ type: GET_TODOS_COMPLETED, payload: response.data });
  } catch (err) {
    console.log(err);
    toast.error(err.response.data, { autoClose: 2000 });
  }
};

export const currentTodo = (inp) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_TODO, payload: inp });
  } catch (err) {
    console.log(err);
    toast.error(err.response.data, { autoClose: 2000 });
  }
};

export const createTodos = (input) => async (dispatch) => {
  try {
    const response = await axios.post("/todos/create", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      data: {
        title: input.title,
        memo: input.memo,
        important: input.important,
        isCompleted: input.isCompleted,
      },
    });
    console.log(response);
    dispatch({ type: CREATE_TODOS, payload: response.data });
  } catch (err) {
    console.log(err);
    toast.error(err.response.data, { autoClose: 2000 });
  }
};

export const updateTodos = (input, id) => async (dispatch, getState) => {
  axios
    .put(`/todos/update/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      data: {
        title: input.title,
        memo: input.memo,
        important: input.important,
        isCompleted: input.isCompleted ? input.isCompleted : false,
      },
    })
    .then((response) => {
      const { todos, completedTodos } = getState().todoState;
      const todo = todos.filter((x) => x._id === id)[0];
      if (
        todo.isCompleted === input.isCompleted &&
        (todo.title !== input.title ||
          todo.memo !== input.memo ||
          todo.important !== input.important)
      ) {
        dispatch({ type: UPDATE_TODOS, payload: response.data.todo });
      } else {
        dispatch({ type: CREATE_COMPLETED_TODO, payload: response.data.todo });
        dispatch({ type: DELETE_TODOS, payload: id });
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data, { autoClose: 2000 });
    });
};

export const recreateTodos = (input, id) => async (dispatch, getState) => {
  console.log("Inside recreate");
  axios
    .put(`/todos/update/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      data: {
        title: input.title,
        memo: input.memo,
        important: input.important,
        isCompleted: input.isCompleted ? input.isCompleted : false,
      },
    })
    .then((response) => {
      console.log(response);
      dispatch({ type: CREATE_TODOS, payload: response.data.todo });
      dispatch({ type: DELETE_COMPLETED_TODOS, payload: id });
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data, { autoClose: 2000 });
    });
};

export const deleteTodos = (id) => (dispatch) => {
  axios
    .delete(`/todos/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      console.log(response);
      dispatch({ type: DELETE_TODOS, payload: id });
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data, { autoClose: 2000 });
    });
};
