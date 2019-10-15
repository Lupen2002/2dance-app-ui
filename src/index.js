// @flow
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@vkontakte/vkui/dist/vkui.css";

import "core-js/es6/map";
import "core-js/es6/set";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import connect from "@vkontakte/vk-connect";
import { Provider } from "react-redux";
import createStore from "./store";
import { PersistGate } from "redux-persist/integration/react";

connect.send("VKWebAppInit", {});

const root = document.getElementById("root");

const {store, persistor} = createStore();

if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
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
serviceWorker.unregister();
