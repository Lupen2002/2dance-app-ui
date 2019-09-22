// @flow

import { combineReducers }    from "redux";
import { userReducer }        from "./user";
import { startParamsReducer } from "./params";

const reducersSrc = {
  user: userReducer,
  startParams: startParamsReducer
};

const reducers = combineReducers<typeof reducersSrc, AppAction>(reducersSrc);

export default reducers;