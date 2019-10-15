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

declare type SetCurrentUserAction = {
  type: 'USER_SET_CURRENT',
  payload?: VKUser
}

declare type AppAction = SetTokenUserAction | SetGroupNameUserAction | SetCurrentUserAction

declare type AppDispatch = Dispatch<AppAction>

declare type UserActions = {
  setToken: (token?: string) => SetTokenUserAction,
  setGroupName: (name?: string) => SetGroupNameUserAction,
  setCurrent: (user?: VkUser) => SetCurrentUserAction
}

declare type AppActions = {
  user: UserActions
}