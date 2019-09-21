// @flow

import React                           from "react";
import { HashRouter, Redirect, Route } from "react-router-dom";
import { Epic }                        from "@vkontakte/vkui";
import { MainView }                    from "./views/main/MainView";
import { AppTabbar }                   from "./epic/tabbar";

function App() {
  return (
    <HashRouter>
      <Epic tabbar={<AppTabbar/>}>
        <Route path="/main" component={MainView} />
        <Redirect from="/" to="/main" />
      </Epic>
    </HashRouter>
  );
}

export default App;
