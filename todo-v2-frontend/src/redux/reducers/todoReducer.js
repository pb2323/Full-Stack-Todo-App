import {
  GET_TODOS,
  CREATE_TODOS,
  UPDATE_TODOS,
  DELETE_TODOS,
  CURRENT_TODO,
} from "../actionTypes";

const initialState = {
  todos: [],
  current: {},
};

const todoReducer = (state = { ...initialState }, action) => {
  let { type, payload } = action;
  let arr = [];
  switch (type) {
    case GET_TODOS:
      console.log({ ...state, todos: payload.todos });
      return { ...state, todos: payload.todos };
    case CURRENT_TODO:
      console.log(payload, type, "Red curr");
      return { ...state, current: payload };
    case CREATE_TODOS:
      arr = state.todos;
      arr.push(payload.todo);
      return { ...state, todos: arr };
    case UPDATE_TODOS:
      const { title, memo, important } = payload;
      arr = state.todos;
      let index = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]._id === payload.id) {
          index = i;
          break;
        }
      }
      arr[index].title = title;
      arr[index].memo = memo;
      arr[index].important = important;
      return { ...state, todos: arr };
    default:
      console.log("Default todo");
      return state;
  }
};

export default todoReducer;
