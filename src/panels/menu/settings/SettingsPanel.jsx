// @flow

import React, { useMemo }           from "react";
import {
  Counter,
  Cell,
  Group,
  List,
  Panel,
  PanelHeader
}                                   from "@vkontakte/vkui";
import { getQueryParams, navigate } from "hookrouter";
import useTicketsToApprovePay       from "../../../hooks/useTicketsToApprovePay";
import { go }                       from "../../../utils/default/url";
import { useSelector }              from "react-redux";

type P = {
  id: MenuViewId
};

export const SettingsPanel = (p: P) => {
  const token = useSelector(({ user }: AppState) => user.token);
  const params = getQueryParams();
  const [altPayTickets] = useTicketsToApprovePay(token);

  const ymSetting = useMemo(
    () => () => navigate("/menu/yandex-money-receiver", false, params),
    [params]
  );

  return (
    <Panel id={p.id}>
      <PanelHeader>Настройки</PanelHeader>
      {params && params.vk_viewer_group_role === "admin" && (
        <Group title="Администратор">
          <List>
            <Cell expandable onClick={ymSetting}>
              Яндекс.Кошелёк
            </Cell>
            <Cell
              expandable
              onClick={() => go("/menu/check-alt-pay")}
              indicator={
                altPayTickets && <Counter>{altPayTickets.length}</Counter>
              }
            >
              Подтверждение оплаты
            </Cell>
          </List>
        </Group>
      )}
    </Panel>
  );
};
