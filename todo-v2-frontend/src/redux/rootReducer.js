import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import todoReducer from "./reducers/todoReducer";
import loadReducer from "./reducers/loadReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  todoState: todoReducer,
  loadState: loadReducer,
});

export default rootReducer;
