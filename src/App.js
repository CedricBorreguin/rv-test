import React from "react";
import { AppBar, Typography } from "@material-ui/core";
import TabsLoader from "./components/TabsLoader";
import { makeStyles } from "@material-ui/core/styles";
import {COLOR_DARK_BLUE} from "./constants";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
  appBar: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  title: {
    color: COLOR_DARK_BLUE,
    fontWeight: "600",
    fontSize: "1.2rem",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <AppBar
        position="sticky"
        classes={{
          root: classes.appBar,
        }}
      >
        <Typography variant="h1" className={classes.title}>
          Menu
        </Typography>
      </AppBar>
      <TabsLoader />
    </main>
  );
}

export default App;
