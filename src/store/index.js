// @flow

import { createStore } from "redux";
import reducers from "./reducers";

export const store = createStore<AppState, AppAction, AppDispatch>(
  reducers,
  undefined
);