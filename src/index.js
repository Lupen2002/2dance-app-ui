// @flow
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@vkontakte/vkui/dist/vkui.css";

import "core-js/es6/map";
import "core-js/es6/set";

import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import connect from "@vkontakte/vk-connect";
import { Provider } from "react-redux";
import createStore from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { getQueryParams } from "hookrouter";
import GroupApp from "./GroupApp";
import GlobalApp from "./GlobalApp";

connect.send("VKWebAppInit", {});

console.log("nodeenv", process.env);

const root = document.getElementById("root");

const { store, persistor } = createStore();
const p = getQueryParams();

if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GroupApp />
      </PersistGate>
    </Provider>,
    root
  );
} else {
  console.error("Element #root doesn't exits");
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
