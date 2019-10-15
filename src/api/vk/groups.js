// @flow

import vkConnect from "@vkontakte/vkui-connect-promise";

type gID = string | number;

const getGroupByIdParams = (group_id: gID, access_token: string) => ({
  method: "groups.getById",
  params: {
    group_id,
    access_token,
    v: "5.101"
  }
});

export async function getGroupById(id: gID, token: string) {
  return vkConnect.send("VKWebAppCallAPIMethod", getGroupByIdParams(id, token));
}
