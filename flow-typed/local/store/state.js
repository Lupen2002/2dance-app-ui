// @flow

declare type AppUserState = {
  token?: string,
  groupName?: string,
  current?: VKUser
}

declare type AppState = {
  user: AppUserState,
  startParams: StartParams
}

