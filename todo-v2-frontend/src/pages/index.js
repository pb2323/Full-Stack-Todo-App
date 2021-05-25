import React from "react";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Create from "../components/NewTodo";
import Completed from "../components/Completed";
import Pending from "../components/Pending";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { currentTodo } from "../redux/actions/todoActions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function FullWidthTabs({ user, todos }) {
  console.log(user, todos);
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  if (!!localStorage.getItem("token"))
    return (
      <Container maxWidth="md">
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Pending" {...a11yProps(0)} />
              <Tab label="Completed" {...a11yProps(1)} />
              <Tab label="Create" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Pending handleChangeTab={handleChange} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Completed handleChangeTab={handleChange} />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <Create
                handleChangeTab={handleChange}
                handleChangeTabIndex={handleChangeIndex}
              />
            </TabPanel>
          </SwipeableViews>
        </div>
      </Container>
    );
  else {
    return <Redirect to={{ pathname: "/login" }}></Redirect>;
  }
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
    todos: storeState.todoState.todos,
  };
};

export default connect(mapStateToProps, { currentTodo })(FullWidthTabs);
