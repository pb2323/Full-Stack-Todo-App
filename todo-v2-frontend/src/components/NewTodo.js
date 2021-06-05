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
  recreateTodos,
} from "../redux/actions/todoActions";
import { setLoad } from "../redux/actions/loadAction";

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
  deleteTodos,
  recreateTodos,
  setLoad,
}) {
  const [title, setTitle] = React.useState("");
  const [memo, setMemo] = React.useState("");
  const [important, changeImportant] = React.useState(false);
  const classes = useStyles();
  toast.configure();

  const onSubmit = async (e) => {
    if (title === "") toast.error("Title is mandatory", { autoClose: 2000 });
    else {
      setLoad(true);
      if (current.hasOwnProperty("title")) {
        await currentTodo({});
        await updateTodos(
          { title, memo, important: important, isCompleted: false },
          current._id
        );
      } else
        await createTodos({
          title,
          memo,
          important: important,
          isCompleted: false,
        });
      handleChangeTab(e, 0);
      setLoad(false);
    }
  };

  const onRecreate = async (e) => {
    if (title === "") toast.error("Title is mandatory", { autoClose: 2000 });
    else {
      setLoad(true);
      await recreateTodos(
        { title, memo, important, isCompleted: false },
        current._id
      );
      await currentTodo({});
      handleChangeTab(e, 0);
      setLoad(false);
    }
  };

  const onDelete = async (e) => {
    setLoad(true);
    await deleteTodos(current._id);
    current.isCompleted ? handleChangeTab(e, 1) : handleChangeTab(e, 0);
    await currentTodo({});
    setLoad(false);
  };

  const onComplete = async (e) => {
    if (title === "") toast.error("Title is mandatory", { autoClose: 2000 });
    else {
      setLoad(true);
      await updateTodos(
        { title, memo, important: important, isCompleted: true },
        current._id
      );
      await currentTodo({});
      handleChangeTab(e, 1);
      setLoad(false);
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
    changeImportant(current.important);
  }, [current]);

  console.log(current.hasOwnProperty("title"));
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
                checked={important}
                onChange={(e) => {
                  changeImportant(e.target.checked);
                }}
                color="primary"
              />
            }
            label="Important"
          />
          {!(
            current.hasOwnProperty("isCompleted") &&
            current.isCompleted === true
          ) ? (
            <>
              <Button onClick={onSubmit} variant="contained" color="primary">
                Save
              </Button>
              {current.hasOwnProperty("title") ? (
                <>
                  <Button
                    onClick={onComplete}
                    variant="contained"
                    color="success"
                  >
                    Mark as Completed
                  </Button>
                  <Button
                    onClick={onDelete}
                    variant="contained"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <Button onClick={onRecreate} variant="contained" color="primary">
                Recreate
              </Button>
              <Button onClick={onDelete} variant="contained" color="secondary">
                Delete
              </Button>
            </>
          )}
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
  recreateTodos,
  setLoad,
})(BasicTextFields);
