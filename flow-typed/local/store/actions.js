// @flow

import type { Dispatch } from "redux";

declare type SetTokenUserAction = {
  type: 'USER_SET_TOKEN',
  payload?: string
}

declare type SetGroupNameUserAction = {
  type: 'USER_SET_GROUP_NAME',
  payload?: string
}

declare type AppAction = SetTokenUserAction | SetGroupNameUserAction

declare type AppDispatch = Dispatch<AppAction>

declare type UserActions = {
  setToken: (token?: string) => SetTokenUserAction,
  setGroupName: (name?: string) => SetGroupNameUserAction
}

declare type AppActions = {
  user: UserActions
}