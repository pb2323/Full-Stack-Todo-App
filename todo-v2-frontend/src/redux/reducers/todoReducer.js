import {
  GET_TODOS,
  CREATE_TODOS,
  UPDATE_TODOS,
  DELETE_TODOS,
} from "../actionTypes";

let state = {
  todos: [],
};

const todoReducer = (a, action, initialState = state) => {
  let { type, payload } = action;
  switch (type) {
    case GET_TODOS:
      return { ...initialState, todos: payload };
    case CREATE_TODOS:
      let arr = initialState.todos;
      arr.push(payload);
      return { ...initialState, todos: arr };
    default:
      return initialState;
  }
};

export default todoReducer;
