import React from "react";
import TabsMenuContainer from "./TabsMenuContainer";
import APIRequest, { apiStates } from "./APIRequest";
import { Typography } from "@material-ui/core";

const DATA_URL = "https://api.adminsite.appsinti.com/menu/product";

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
