// @flow

import React, { useState, useEffect }               from "react";
import { Group, Cell, Avatar }                      from "@vkontakte/vkui";
import { List, Panel, PanelHeader }                 from "@vkontakte/vkui";
import vkConnect                                    from "@vkontakte/vkui-connect-promise";
import LeftPanelHeaderButtons                       from "../../../components/controlls/LeftPanelHeaderButtons";
import { getQueryParams, navigate, setQueryParams } from "hookrouter";
import useUserToken                                 from "../../../hooks/useUserToken";
import PanelSpinner                                 from "@vkontakte/vkui/dist/components/PanelSpinner/PanelSpinner";
import useVkUser                                    from "../../../hooks/useVkUser";

type P = {
  id: EventsViewId
};

export const EventsSecondUser = (p: P) => {
  const user = useVkUser(),
    token = useUserToken(true);
  const [friends, setFriends] = useState(null);

  const go = (sec: number) => () => {
    navigate("/events/pay", false, { sec }, false);
  };

  useEffect(() => {
    const {sec, ...query} = getQueryParams();
    setQueryParams(query)
  }, []);

  useEffect(() => {
    if (user && token) {
      vkConnect
        .send("VKWebAppCallAPIMethod", {
          method: "friends.get",
          params: { fields: "sex,photo_100", v: "5.101", access_token: token }
        })
        .then(({ data }) => {
          setFriends(data.response.items.filter(u => u.sex !== user.sex));
        });
    }
  }, [token, user]);

  return (
    <Panel id={p.id}>
      <PanelHeader
        left={
          <LeftPanelHeaderButtons
            type="back"
            back={() => window.history.go(-1)}
          />
        }
      >
        Мой "+1"
      </PanelHeader>
      {!friends && <PanelSpinner />}
      {friends && (
        <Group>
          <List>
            {friends.map(f => (
              <Cell
                key={`friends-${f.id}`}
                expandable
                onClick={go(f.id)}
                before={<Avatar size={40} src={f.photo_100} />}
              >
                {f.first_name} {f.last_name}
              </Cell>
            ))}
          </List>
        </Group>
      )}
    </Panel>
  );
};
