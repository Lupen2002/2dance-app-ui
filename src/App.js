// @flow

import React from "react";
import { HashRouter, Redirect, Route } from "react-router-dom";
import { RootEpic } from "./epic";

function App() {
  return (
    <HashRouter>
      <Route path="/:epicId" component={RootEpic} />
      <Redirect from="/" to="/main" />
    </HashRouter>
  );
}

export default App;
