// @flow

import React         from "react";
import { useRoutes } from "hookrouter";
import { RootEpic }  from "./epic";

const routes = {
  "/": () => <RootEpic epicId="main" />,
  "/:epicId": ({ epicId }) => <RootEpic epicId={epicId} />,
  "/:epicId/:panelId": ({ epicId, panelId }) => <RootEpic epicId={epicId} panelId={panelId} />,
};

function App() {
  return useRoutes(routes);
}

export default App;
