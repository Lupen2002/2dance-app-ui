// @flow
import {useMemo, useState}     from 'react'
import vkConnect     from "@vkontakte/vkui-connect-promise";

const checkAllowMessages = async (userId: number, token: string) => {
  vkConnect.send('VKWebAppCallAPIMethod', {
    method: 'messages.isMessagesFromGroupAllowed',
    params: {
      group_id: 188206381,
      user_id: userId,
      v: '5.103',
      access_token: token
    },
  })
}

export default function useAllowSendMessages(token: ?string) {
  const [result, setResult] = useState(null);
  const fun = useMemo(() => async () => {
    if (token) {
      const res = (await vkConnect.send("VKWebAppAllowMessagesFromGroup", {"group_id": 188206381, "key": ""})).data;
      setResult(!!res.result)
    }
  }, [token]);

  return [fun, result];
}