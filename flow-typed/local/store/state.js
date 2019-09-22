// @flow

declare type AppUserState = {
  token?: string,
  groupName?: string
}

declare type AppState = {
  user: AppUserState,
  startParams: StartParams
} | void

