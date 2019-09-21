// @flow

import { combineReducers } from "redux";
import { userReducer }     from "./user";

const reducersSrc = {
  user: userReducer
};

const reducers = combineReducers<typeof reducersSrc, AppAction>(reducersSrc);

export default reducers;