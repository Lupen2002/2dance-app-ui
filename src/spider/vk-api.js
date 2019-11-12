// @flow
import vkConnect          from "@vkontakte/vkui-connect-promise";
import { throttledQueue } from "../utils/default/request-rate-limit";

const throttled = throttledQueue(1, 1000);

export const rateVkLimit = (): Promise<*> => {
  return new Promise( res => throttled(() => {
    res()
  }))
};

export async function groupsGet(access_token: string): Promise<number[]> {
  await rateVkLimit();
  const res = await vkConnect.send("VKWebAppCallAPIMethod", {
    method: "groups.get",
    params: {
      filter: "events",
      count: 1000,
      v: "5.103",
      access_token
    }
  });

  return res.data.response.items
}
