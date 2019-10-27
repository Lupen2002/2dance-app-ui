// @flow

import React, { useState, useEffect } from "react";
import { Group, Cell, Avatar }      from "@vkontakte/vkui";
import { List, Panel, PanelHeader } from "@vkontakte/vkui";
import vkConnect                    from "@vkontakte/vkui-connect-promise";
import LeftPanelHeaderButtons       from "../../../components/controlls/LeftPanelHeaderButtons";
import { getQueryParams, navigate } from "hookrouter";
import useUserToken                 from "../../../hooks/useUserToken";
import PanelSpinner                 from "@vkontakte/vkui/dist/components/PanelSpinner/PanelSpinner";
import { postTickets }              from "../../../api";

type P = {
  id: MainViewId
};

export const MainSecondUser = (p: P) => {
  const query = getQueryParams(),
    token = useUserToken(true);

  const [friends, setFriends] = useState(null);

  useEffect(() => {
    vkConnect
      .send("VKWebAppCallAPIMethod", {
        method: "friends.get",
        params: { fields: "sex,photo_100", v: "5.101", access_token: token }
      })
      .then(({ data }) => {
        setFriends(data.response);
      });
  }, []);

  const payToGroup = (secondUserId: number) => async () => {
    try {
      const res = await vkConnect.send("VKWebAppOpenPayForm", {
        app_id: 7062331,
        action: "pay-to-group",
        params: {
          amount: 1,
          group_id: parseInt(query.vk_group_id)
        }
      });
      if (res.type === "VKWebAppOpenPayFormResult" && res.data.status) {
        const ticket: $Rest<Ticket, { _id: string }> = {
          ticketType: 'double-pass',
          vkGroupId: parseInt(query.vk_group_id),
          vkUserId: parseInt(query.vk_user_id),
          secondUserId,
          transactionId: res.data.transaction_id,
          amount: res.data.amount,
          extra: res.data.extra
        };
        await postTickets(ticket);
        navigate('/main/main', false, query)
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Panel id={p.id}>
      <PanelHeader
        left={
          <LeftPanelHeaderButtons
            type="back"
            back={() => navigate("/main/main", false, query)}
          />
        }
      >
        Мой "+1"
      </PanelHeader>
      {!friends && <PanelSpinner />}
      {friends && (
        <Group>
          <List>
            {friends.items.map( f => (
              <Cell expandable onClick={payToGroup(f.id)} before={<Avatar size={40} src={f.photo_100}/>}>{f.first_name} {f.last_name}</Cell>
            ))}
          </List>
        </Group>
      )}
    </Panel>
  );
};
