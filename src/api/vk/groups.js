// @flow

import vkConnect    from "@vkontakte/vkui-connect-promise";
import { MapCache } from "../../utils/cache/MapCache";

type gID = string | number;

const cache = new MapCache(60 * 60 * 1000);

const getGroupByIdParams = (group_id: gID, access_token: string) => ({
  method: "groups.getById",
  params: {
    group_id,
    access_token,
    v: "5.101"
  }
});

export async function getGroupById(id: gID, token: string) {
  if (cache.get('id-'+id)) {
    return cache.get('id-'+id);
  } else {
    const res = await vkConnect.send("VKWebAppCallAPIMethod", getGroupByIdParams(id, token));
    cache.put('id-'+id, res);
    return res
  }
}
