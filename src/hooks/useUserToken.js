// @flow

import { useEffect } from "react";
import vkConnect from "@vkontakte/vkui-connect-promise";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../store/actions";
import { getQueryParams, navigate } from "hookrouter";

export default function useUserToken(isRedirect?: boolean) {
  const token = useSelector<AppState, ?string>(state => state.user.token),
    dispatch: AppDispatch = useDispatch(),
    params = getQueryParams();

  useEffect(() => {
    if (!isRedirect && !token) {
      vkConnect
        .send("VKWebAppGetAuthToken", {
          app_id: 7062331,
          scope: "groups,stats"
        })
        .then(res => {
          dispatch(appActions.user.setToken(res.data.access_token));
        });
    }
  }, [dispatch, token, isRedirect]);

  useEffect(() => {
    if (isRedirect && !token) {
      navigate("/", false, params);
    }
  }, [token, isRedirect, params]);

  return token;
}
