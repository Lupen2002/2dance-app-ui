// @flow

import { useEffect } from "react";
import vkConnect from "@vkontakte/vkui-connect-promise";
import useUserToken from "./useUserToken";
import useStartParams from "./useStartParams";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../store/actions";

export default function useCurrentGroup() {
  const token = useUserToken(),
    params = useStartParams(),
    dispatch: AppDispatch = useDispatch();
  const name = useSelector<AppState, ?string>(state => state.user.groupName);

  useEffect(() => {
    if (!name && token && params.vk_group_id) {
      vkConnect
        .send("VKWebAppCallAPIMethod", {
          method: "groups.getById",
          params: {
            group_id: params.vk_group_id,
            v: "5.101",
            access_token: token
          }
        })
        .then(res => {
          if (res.data && res.data.response && res.data.response.length > 0) {
            const group = res.data.response[0];
            dispatch(appActions.user.setGroupName(group.name));
          }
        });
    }
  }, [name, token, params.vk_group_id]);

  return name
}
