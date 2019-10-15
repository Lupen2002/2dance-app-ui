// @flow

import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["startParams", "user"]
};

const persistedReducer: any = persistReducer<AppState, AppAction>(
  persistConfig,
  reducers
);

export default () => {
  let store = createStore<AppState, AppAction, AppDispatch>(
    persistedReducer,
    undefined
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
