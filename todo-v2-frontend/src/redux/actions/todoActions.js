import {
  GET_TODOS,
  CREATE_TODOS,
  UPDATE_TODOS,
  DELETE_TODOS,
} from "../actionTypes";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:1234";

export const getTodos = () => (dispatch) => {
  axios
    .get("/todos", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      console.log(response);
      dispatch({ type: GET_TODOS, payload: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createTodos = (input) => (dispatch) => {
  axios
    .post("/todos/create", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      title: input.title,
      memo: input.memo,
      important: input.important,
    })
    .then((response) => {
      console.log(response);
      dispatch({ type: CREATE_TODOS, payload: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateTodos = (input, id) => (dispatch) => {
  axios
    .put(`/todos/update/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      title: input.title,
      memo: input.memo,
      important: input.important,
    })
    .then((response) => {
      console.log(response);
      dispatch({ type: UPDATE_TODOS, payload: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteTodos = (id) => (dispatch) => {
  axios
    .put(`/todos/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      console.log(response);
      dispatch({ type: DELETE_TODOS, payload: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
};
