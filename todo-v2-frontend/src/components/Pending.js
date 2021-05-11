import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import {
  getTodos,
  updateTodos,
  deleteTodos,
  createTodos,
} from "../redux/actions/todoActions";

const useStyles = makeStyles((theme) => ({
  listsImp: {
    textAlign: "left",
    padding: "10px",
    borderBottomRightRadius: ".25rem",
    borderBottomLeftRadius: ".25rem",
    margin: "2%",
    backgroundColor: "#f5c6cb",
    color: "#721c24",
  },
  lists: {
    textAlign: "left",
    padding: "10px",
    borderBottomRightRadius: ".25rem",
    borderBottomLeftRadius: ".25rem",
    margin: "2%",
    borderStyle: "ridge",
  },
}));

function BasicTextFields({ getTodos }) {
  const [todos, setTodos] = React.useState([
    { title: "title", body: "body" },
    { title: "title", body: "body" },
    { title: "title", body: "body" },
    { title: "title", body: "body" },
  ]);
  const classes = useStyles();



  return (
    <Container style={{ marginTop: "5%" }}>
      <h1 style={{ textAlign: "left" }}>{todos.length} Current Todos</h1>
      {todos.map((obj, index) => {
        return (
          <div key={index} className={classes.lists}>
            {obj.title + " " + obj.body}
          </div>
        );
      })}
    </Container>
  );
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
    todos: storeState.todoState.todos,
  };
};

export default connect(mapStateToProps, {
  getTodos,
  createTodos,
  updateTodos,
  deleteTodos,
})(BasicTextFields);
