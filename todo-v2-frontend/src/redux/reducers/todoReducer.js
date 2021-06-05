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

const initialState = {
  todos: [],
  current: {},
  completedTodos: [],
};

const todoReducer = (state = { ...initialState }, action) => {
  let { type, payload } = action;
  let arr = [];
  let id;
  switch (type) {
    case GET_TODOS:
      return { ...state, todos: payload.todos };
    case GET_TODOS_COMPLETED:
      return { ...state, completedTodos: payload.todos };
    case CURRENT_TODO:
      return { ...state, current: payload };
    case CREATE_TODOS:
      arr = state.todos;
      arr.push(payload);
      return { ...state, todos: arr };
    case CREATE_COMPLETED_TODO:
      arr = state.completedTodos;
      arr.push(payload.todo);
      return { ...state, todos: arr };
    case UPDATE_TODOS:
      arr = state.todos;
      let index = -1;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]._id === payload._id) {
          index = i;
          break;
        }
      }
      arr[index] = payload;
      return { ...state, todos: arr };
    case RECREATE_TODOS:
      arr = state.completedTodos;
      arr = arr.filter((x) => x && x._id !== payload._id);
      return { ...state, completedTodos: arr };
    case DELETE_TODOS:
      id = payload;
      arr = state.todos.filter((x) => x && x._id !== id);
      return { ...state, todos: arr };
    case DELETE_COMPLETED_TODOS:
      id = payload;
      arr = state.completedTodos.filter((x) => x && x._id !== id);
      return { ...state, todos: arr };
    default:
      return state;
  }
};

export default todoReducer;
