import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/userReducer";
import todoReducer from "./reducers/todoReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userState", "todoState"],
};

const rootReducer = combineReducers({
  userState: userReducer,
  todoState: todoReducer,
});

export default persistReducer(persistConfig, rootReducer);
