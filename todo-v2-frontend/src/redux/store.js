import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const persistConfig = {
  key: "Root",
  storage: storage,
  whitelist: ["userState", "todoState"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
// const exp = { persistor, store };

// export default exp;
