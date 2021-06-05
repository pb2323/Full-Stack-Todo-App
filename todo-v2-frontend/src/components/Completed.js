import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  getTodos,
  updateTodos,
  deleteTodos,
  createTodos,
  getTodosCompleted,
  currentTodo,
} from "../redux/actions/todoActions";
import { setLoad } from "../redux/actions/loadAction";
import { connect } from "react-redux";

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
  const [todos, setTodos] = React.useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function loadAndFetch() {
      props.setLoad(true);
      await props.getTodosCompleted();
      if (props.todo && props.todo.length > 0) setTodos(props.todo);
      props.setLoad(false);
    }
    loadAndFetch();
  }, []);

  useEffect(() => {
    async function loadAndFetch() {
      props.setLoad(true);
      await props.currentTodo({});
      if (props.todo && props.todo.length >= 0) setTodos(props.todo);
      props.setLoad(false);
    }
    loadAndFetch();
  }, [props.todo]);
  return (
    <Container style={{ marginTop: "5%" }}>
      <h1 style={{ textAlign: "left" }}>Completed Todos</h1>
      {todos.map((obj, index) => {
        if (obj)
          return (
            <div
              onClick={(e) => {
                console.log("Inside here");
                props.currentTodo(obj);
                props.handleChangeTab(e, 2);
              }}
              key={index}
              className={!obj.important ? classes.lists : classes.listsImp}
            >
              {obj.title +
                " - Completed " +
                new Date(obj.updatedAt).toString().slice(0, 25)}

              {/* {new Date(obj.updatedAt)} */}
            </div>
          );
      })}
    </Container>
  );
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
    todo: storeState.todoState.completedTodos,
  };
};

export default connect(mapStateToProps, {
  getTodos,
  createTodos,
  updateTodos,
  deleteTodos,
  getTodosCompleted,
  currentTodo,
  setLoad,
})(BasicTextFields);
