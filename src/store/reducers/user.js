// @flow

const defaultState: AppUserState = {};

export const userReducer = (
  state: AppUserState = defaultState,
  action: AppAction
) => {
  if ("type" in action) {
    switch (action.type) {
      case "USER_SET_TOKEN":
        return { ...state, token: action.payload };
      case "USER_SET_GROUP_NAME":
        return { ...state, groupName: action.payload };
      case "USER_SET_CURRENT":
        return { ...state, current: action.payload };
      default:
        return state;
    }
  } else {
    return state;
  }
};
