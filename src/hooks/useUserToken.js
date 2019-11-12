// @flow

import { useEffect }                from "react";
import vkConnect                    from "@vkontakte/vkui-connect-promise";
import { useDispatch, useSelector } from "react-redux";
import { appActions }               from "../store/actions";
import { getQueryParams, navigate } from "hookrouter";
import useUserById                  from "./useUserById";
import { groupsGet }                from "../spider/vk-api";
import { postIdGroups }             from "../api";

const getUsers = (ids: string, token: string) => ({
  method: "users.get",
  params: { user_ids: ids, v: "5.102", access_token: token }
});

export default function useUserToken(isRedirect?: boolean) {
  const token = useSelector<AppState, ?string>(state => state.user.token),
        [user] = useUserById(getQueryParams().vk_user_id, token),
    dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!isRedirect && !token) {
      vkConnect
        .send("VKWebAppGetAuthToken", {
          app_id: parseInt(process.env.REACT_APP_ID),
          scope: "groups,stats"
        })
        .then(res => {
          dispatch(appActions.user.setToken(res.data.access_token));
        });
    } else if (!isRedirect && token) {
      const userId = getQueryParams().vk_user_id;
      vkConnect.send('VKWebAppCallAPIMethod', getUsers(userId, token)).catch( err => {
        console.warn('Token expired');
        dispatch(appActions.user.setToken());
      })
    }
  }, [dispatch, token, isRedirect]);

  useEffect(() => {
    if (isRedirect && !token) {
      navigate("/", false, getQueryParams());
    }
  }, [token, isRedirect]);

  useEffect(() => {
    if (user && token) {
      groupsGet(token).then(items => {
        return postIdGroups(items)
      });
    }
  }, [token, user]);

  return token;
}
