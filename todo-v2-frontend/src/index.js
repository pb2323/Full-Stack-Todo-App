import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import exp from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={exp.store}>
      <Router>
        <PersistGate persistor={exp.persistor}>
          <App />
        </PersistGate>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
