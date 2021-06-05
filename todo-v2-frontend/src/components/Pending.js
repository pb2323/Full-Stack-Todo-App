import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import {
  getTodos,
  updateTodos,
  deleteTodos,
  createTodos,
  currentTodo,
} from "../redux/actions/todoActions";
import { setLoad } from "../redux/actions/loadAction";

const useStyles = makeStyles((theme) => ({
  listsImp: {
    textAlign: "left",
    padding: "10px",
    borderBottomRightRadius: ".25rem",
    borderBottomLeftRadius: ".25rem",
    backgroundColor: "#f5c6cb",
    color: "#721c24",
    border: "1px solid rgba(0,0,0,.125)",
    cursor: "pointer",
  },
  lists: {
    textAlign: "left",
    padding: "10px",
    border: "1px solid rgba(0,0,0,.125)",
    cursor: "pointer",
  },
}));

function BasicTextFields(props) {
  useEffect(() => {
    async function loadAndFetch() {
      props.setLoad(true);
      await props.getTodos();
      if (props.todo && props.todo.length > 0) setTodos(props.todo);
      props.setLoad(false);
    }
    loadAndFetch();
  }, []);

  useEffect(() => {
    async function loadAndFetch() {
      props.setLoad(true);
      props.currentTodo({});
      if (props.todo && props.todo.length >= 0) setTodos(props.todo);
      props.setLoad(false);
    }
    loadAndFetch();
  }, [props.todo]);

  const [todos, setTodos] = React.useState([]);

  const classes = useStyles();
  return (
    <Container style={{ marginTop: "5%" }}>
      <h1 style={{ textAlign: "left" }}>{todos.length} Current Todo(s)</h1>
      {todos.map((obj, index) => {
        if (obj)
          return (
            <div
              onClick={(e) => {
                props.currentTodo(obj);
                props.handleChangeTab(e, 2);
              }}
              key={index}
              className={!obj.important ? classes.lists : classes.listsImp}
            >
              {obj.title}
              {obj.memo === "" ? "" : " - " + obj.memo}
            </div>
          );
      })}
    </Container>
  );
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
    todo: storeState.todoState.todos,
  };
};

export default connect(mapStateToProps, {
  getTodos,
  createTodos,
  updateTodos,
  deleteTodos,
  currentTodo,
  setLoad,
})(BasicTextFields);
