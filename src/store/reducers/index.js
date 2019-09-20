// @flow

import { combineReducers } from "redux";

const reducersSrc = {};

const reducers = combineReducers<typeof reducersSrc, AppAction>(reducersSrc);

export default reducers;