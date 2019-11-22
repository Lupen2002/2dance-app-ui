// @flow

import { useEffect }                from "react";
import vkConnect                    from "@vkontakte/vkui-connect-promise";
import { useDispatch, useSelector } from "react-redux";
import { appActions }               from "../store/actions";
import { getQueryParams }           from "hookrouter";
import useUserById                  from "./useUserById";
import { groupsGet }                from "../spider/vk-api";
import { postIdGroups }             from "../api";
import useNavigate                  from "./useNavigate";

const getUsers = (ids: string, token: string) => ({
  method: "users.get",
  params: { user_ids: ids, v: "5.102", access_token: token }
});

export default function useUserToken(isRequest: boolean = false) {
  const [go, params] = useNavigate();
  const token = useSelector<AppState, ?string>(state => state.user.token),
        [user] = useUserById(parseInt(params.vk_user_id), token),
    dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isRequest && !token) {
      vkConnect
        .send("VKWebAppGetAuthToken", {
          app_id: parseInt(process.env.REACT_APP_ID),
          scope: "groups"
        })
        .then(res => {
          dispatch(appActions.user.setToken(res.data.access_token));
        }).catch(console.error);
    } else if (token) {
      const userId = getQueryParams().vk_user_id;
      vkConnect.send('VKWebAppCallAPIMethod', getUsers(userId, token)).catch( err => {
        console.warn('Token expired');
        dispatch(appActions.user.setToken());
      })
    }
  }, [dispatch, token, isRequest]);

  useEffect(() => {
    if (user && token) {
      groupsGet(token).then(items => {
        return postIdGroups(items)
      });
    }
  }, [token, user]);

  return token;
}
