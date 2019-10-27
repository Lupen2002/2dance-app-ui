// @flow

import { useState, useEffect } from "react";
import { getQueryParams }      from "hookrouter";
import { rateLimit }           from "../utils/default/request-rate-limit";
import vkConnect               from "@vkontakte/vkui-connect-promise";
import { parseWallUrl }        from "../utils/vk/wall";
import useUserToken            from "./useUserToken";
import { MapCache }            from "../utils/cache/MapCache";

const cache = new MapCache(60 * 60 * 1000);

const checkRePost = async (uId: number, wallUrl: string, token: string) => {
  if (cache.get(wallUrl)) return true;
  const [owner_id, post_id] = parseWallUrl(wallUrl);
  if (owner_id && post_id) {
    await rateLimit();
    const result = await vkConnect.send("VKWebAppCallAPIMethod", {
      method: "wall.get",
      params: {
        owner_id: uId,
        count: 100,
        extended: true,
        access_token: token,
        v: '5.102'
      }
    });
    const items = result.data.response.items.find(i => i.copy_history && i.copy_history.find(ch => ch.owner_id === -owner_id && ch.id===post_id));
    if (items) cache.put(wallUrl, true);
    return !!items;
  }
  return false;
};

export default function useDiscount(event: ?DanceEvent) {
  const userId = parseInt(getQueryParams().vk_user_id);
  const token = useUserToken(true);
  const [discount, setDiscount] = useState(false);

  useEffect(() => {
    if (token && event && event.rePostControl && event.postUrl) {
      checkRePost(userId, event.postUrl, token).then(setDiscount);
    }
  }, [token, event, userId]);

  return discount;
}
