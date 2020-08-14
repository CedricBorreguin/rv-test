import React from "react";
import TabsMenuContainer from "./TabsMenuContainer";
import APIRequest, { apiStates } from "../APIRequest";
import { Typography } from "@material-ui/core";
import {DATA_URL} from "../constants";


function TabsLoader() {
  const { state, error, data } = APIRequest(DATA_URL);

  switch (state) {
    case apiStates.ERROR:
      return <Typography>ERROR: {error || "Unknown error"}</Typography>;
    case apiStates.SUCCESS:
      return (
        <TabsMenuContainer
          categories={data}
        />
      );
    default:
      return <Typography>Loading...</Typography>;
  }
}

export default TabsLoader;
