import {
  LOGIN_USER,
  REGISTER_USER,
  GET_TODOS,
  GET_TODOS_COMPLETED,
  CURRENT_TODO,
} from "../actionTypes";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
axios.defaults.baseURL = "http://127.0.0.1:1234";

export const loginUser = (user) => (dispatch) => {
  axios
    .post("/users/login", {
      email: user.email,
      password: user.password,
      rememberMe: user.rememberMe,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      console.log(response);
      response.status === 200 &&
        dispatch({
          type: LOGIN_USER,
          payload: { ...response.data.user, token: response.data.token },
        });
    })
    .catch((err) => {
      console.log(err.response, "err");
      toast.error(err.response.data, { autoClose: 2000 });
    });
};

export const registerUser = (user) => (dispatch) => {
  axios
    .post("/users/register", {
      email: user.email,
      password: user.password,
      name: user.name,
    })
    .then((response) => {
      console.log(response);
      localStorage.setItem("token", response.data.token);
      response.status === 200 &&
        dispatch({
          type: REGISTER_USER,
          payload: { ...response.data.user[0], token: response.data.token },
        });
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data, { autoClose: 2000 });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.setItem("token", "");
  dispatch({ type: LOGIN_USER, payload: {} });
  dispatch({ type: GET_TODOS, payload: [] });
  dispatch({ type: GET_TODOS_COMPLETED, payload: [] });
  dispatch({ type: CURRENT_TODO, payload: {} });
};
