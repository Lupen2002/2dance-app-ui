// @flow

import React, { useState }                from "react";
import { Epic, Group, Panel, Root, View } from "@vkontakte/vkui";
import { Placeholder, Button }            from "@vkontakte/vkui";
import Icon56UsersOutline                 from "@vkontakte/icons/dist/56/users_outline";
import useUserToken                       from "../../hooks/useUserToken";

type P = {};

export default function ConfirmEpic(p: P) {
  const [request, setRequest] = useState(false);
  useUserToken(request);

  return (
    <Root activeView='main'>
      <View id='main' activePanel='main'>
      <Panel id="main" centered>
        <Placeholder
          icon={<Icon56UsersOutline />}
          title="Важно!"
          action={
            <Button size="l" onClick={() => setRequest(true)}>
              Дать доступ
            </Button>
          }
        >
          Для корректной работы приложения, необходим доступ к событиям на
          которые вы подписаны.
        </Placeholder>
      </Panel>
      </View>
    </Root>
  );
}
