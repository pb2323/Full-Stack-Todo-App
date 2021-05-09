import "./App.css";
import NavBar from "./components/AppBar";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Home from "./pages/index";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/todos" component={Home} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Redirect to="/login" />
      </Switch>
    </div>
  );
}

export default App;
