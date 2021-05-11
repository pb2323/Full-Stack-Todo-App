import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import { persistStore } from "redux-persist";
// import throttle from "lodash/throttle";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("state", serializedState);
//   } catch {
//     // do nothing
//   }
// };

// export const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem("state");
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (err) {
//     return undefined;
//   }
// };

// const persistedState = loadState();
const store = createStore(
  rootReducer,
  // persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);

// store.subscribe(
//   throttle(() => {
//     let save = { ...store.getState() };
//     saveState({ ...save });
//   }, 1000)
// );

const persistor = persistStore(store);
const exp = { persistor, store };

export default exp;
