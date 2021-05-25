import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import {
  getTodos,
  updateTodos,
  deleteTodos,
  createTodos,
  currentTodo,
} from "../redux/actions/todoActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50%",
    },
  },
}));

function BasicTextFields({
  createTodos,
  handleChangeTab,
  current,
  currentTodo,
  updateTodos,
}) {
  const [title, setTitle] = React.useState("");
  const [memo, setMemo] = React.useState("");
  const [checked, changeCheck] = React.useState(false);
  const classes = useStyles();
  toast.configure();
  const onSubmit = (e) => {
    if (title === "") toast.error("Title is mandatory", { autoClose: 2000 });
    else {
      if (current.hasOwnProperty("title")) {
        currentTodo({});
        updateTodos({ title, memo, important: checked }, current.id);
      } else createTodos({ title, memo, important: checked });
      handleChangeTab(e, 0);
    }
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeInput = (event) => {
    setMemo(event.target.value);
  };

  useEffect(() => {
    setTitle(current.title);
    setMemo(current.memo);
    changeCheck(current.important);
  }, [current]);

  return (
    <Container style={{ marginTop: "5%" }}>
      <Paper elevation={3}>
        <h2>New Todo</h2>
        <form className={classes.root} autoComplete="off">
          <FormControl>
            <InputLabel htmlFor="component-simple">Title</InputLabel>
            <Input
              id="component-simple"
              value={title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-simple">Memo</InputLabel>
            <Input
              multiline
              rows={3}
              id="component-simple"
              value={memo}
              onChange={handleChangeInput}
            />
          </FormControl>
          <FormControlLabel
            style={{ marginLeft: "0" }}
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => {
                  changeCheck(e.target.checked);
                }}
                color="primary"
              />
            }
            label="Important"
          />
          <Button onClick={onSubmit} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={onSubmit} variant="contained" color="success">
            Complete
          </Button>
          <Button onClick={onSubmit} variant="contained" color="secondary">
            Delete
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
    todo: storeState.todoState.todos,
    current: storeState.todoState.current,
  };
};

export default connect(mapStateToProps, {
  getTodos,
  createTodos,
  updateTodos,
  deleteTodos,
  currentTodo,
})(BasicTextFields);
