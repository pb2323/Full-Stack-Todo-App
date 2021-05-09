import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50%",
    },
  },
}));

export default function BasicTextFields() {
  const [title, setTitle] = React.useState("");
  const [memo, setMemo] = React.useState("");
  const [checked, changeCheck] = React.useState(false);
  const classes = useStyles();

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeInput = (event) => {
    setMemo(event.target.value);
  };

  return (
    <Container style={{ marginTop: "5%" }}>
      <Paper elevation={3}>
        <h2>New Todo</h2>
        <form className={classes.root} noValidate autoComplete="off">
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
          <Button variant="contained" color="primary">
            Save
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
