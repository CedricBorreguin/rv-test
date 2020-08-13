import React from "react";
import "./css/App.css";
import { AppBar, Typography } from "@material-ui/core";
import TabsLoader from "./components/TabsLoader";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
}));

function App() {

  const classes = useStyles();

  return (
    <main className={classes.root}>
      <AppBar position="sticky" className="AppBar">
        <Typography variant="h1" className="app-title">
          Menu
        </Typography>
      </AppBar>
      <TabsLoader />
    </main>
  );
}

export default App;
