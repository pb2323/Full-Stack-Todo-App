import {
  GET_TODOS,
  CREATE_TODOS,
  UPDATE_TODOS,
  DELETE_TODOS,
} from "../actionTypes";

const initialState = {
  todos: [],
  sample: [],
};

const todoReducer = (state = { ...initialState }, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_TODOS:
      console.log({ ...state, todos: payload.todos });
      return { ...state, todos: payload.todos };
    case "SET_TODOS":
      // console.log({ ...state, todos: payload.todos });
      return { ...state, todos: [1, 2] };
    case CREATE_TODOS:
      let arr = state.todos;
      arr.push(payload);
      return { ...state, todos: arr };
    default:
      console.log("Default todo");
      return state ;
  }
};

export default todoReducer;
