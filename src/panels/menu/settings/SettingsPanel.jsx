// @flow

import React, { useMemo } from "react";
import {
  Counter,
  Cell,
  Group,
  List,
  Panel,
  PanelHeader
} from "@vkontakte/vkui";
import { getQueryParams, navigate } from "hookrouter";
import useTicketsToApprovePay from "../../../hooks/useTicketsToApprovePay";
import { go } from "../../../utils/default/url";
import { useSelector } from "react-redux";
import useUserToken from "../../../hooks/useUserToken";
import useAllowSendMessages from "../../../hooks/useAllowSendMessages";
import useUserById from "../../../hooks/useUserById";

type P = {
  id: MenuViewId
};

export const SettingsPanel = (p: P) => {
  const params = getQueryParams();
  const token = useUserToken(true),
    [user, refresh] = useUserById(parseInt(params.vk_user_id), token),
    [requestAllow] = useAllowSendMessages(token);
  const [altPayTickets] = useTicketsToApprovePay(token);

  const ymSetting = useMemo(
    () => () => navigate("/menu/yandex-money-receiver", false, params),
    [params]
  );

  const onRequestAllow = async () => {
    await requestAllow();
    await refresh()
  };

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
            <Cell
              onClick={onRequestAllow}
              indicator={
                user && user.allowMessages && <i className="fas fa-check" />
              }
            >
              Включить уведомления
            </Cell>
            <Cell expandable onClick={() => go('/menu/pay-kinds')}>
              Виды оплаты
            </Cell>
            <Cell expandable onClick={() => go('/menu/users-roles')}>
              Права пользователей
            </Cell>
          </List>
        </Group>
      )}
    </Panel>
  );
};
