import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import todoReducer from "./reducers/todoReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  todoState: todoReducer,
});

export default rootReducer;
