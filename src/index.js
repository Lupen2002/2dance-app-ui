// @flow
import "@fortawesome/fontawesome-free/scss/fontawesome.scss"

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import connect from "@vkontakte/vk-connect";
import { Provider } from "react-redux";
import { store } from "./store";

connect.send("VKWebAppInit", {});

const root = document.getElementById("root");

if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
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
