import {
  GET_TODOS,
  CREATE_TODOS,
  UPDATE_TODOS,
  DELETE_TODOS,
  CURRENT_TODO,
} from "../actionTypes";
import axios from "axios";
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
  }
};

export const currentTodo = (inp) => async (dispatch) => {
  try {
    console.log("Dispatching Curr");
    dispatch({ type: CURRENT_TODO, payload: inp });
  } catch (err) {
    console.log(err);
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
      },
    });
    console.log(response);
    dispatch({ type: CREATE_TODOS, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const updateTodos = (input, id) => (dispatch) => {
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
      },
    })
    .then((response) => {
      console.log(response);
      dispatch({ type: UPDATE_TODOS, payload: { ...input, id } });
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
