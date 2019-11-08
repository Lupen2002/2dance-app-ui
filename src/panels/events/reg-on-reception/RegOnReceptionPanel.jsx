// @flow
import React, { useState } from "react";
import { getQueryParams } from "hookrouter";
import {
  Cell,
  CellButton,
  Group,
  Panel,
  PanelHeader,
  PullToRefresh
} from "@vkontakte/vkui";
import LeftPanelHeaderButtons from "../../../components/controlls/LeftPanelHeaderButtons";
import { go } from "../../../utils/default/url";
import { useEventById } from "../../../hooks/useEventById";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import { postTickets } from "../../../api";
import usePrice from "../../../hooks/usePrice";

type P = {
  id: EventsViewId
};

export default function RegOnReceptionPanel(p: P) {
  const { event_id } = getQueryParams(),
    [event, refresh, fetching] = useEventById(event_id),
    [throttling, setThrottling] = useState(false),
    price = usePrice(event, getQueryParams().pass);

  const onSubmit = async () => {
    setThrottling(true);
    if (event && price) {
      const { event_id, vk_group_id, vk_user_id } = getQueryParams();
      const ticket: $Rest<Ticket, {| _id: string |}> = {
        ticketType: 'single-pass',
        vkGroupId: parseInt(vk_group_id),
        vkUserId: parseInt(vk_user_id),
        eventId: event_id,
        amount: price,
        isClose: true,
        altPay: {
          createdAt: Date.now(),
          comment: "Оплата наличными,  на месте",
          approve: false
        }
      };
      await postTickets(ticket);
      setThrottling(false);
      go("/main");
    }
  };

  return (
    <Panel id={p.id}>
      <PanelHeader
        left={<LeftPanelHeaderButtons type="cancel" back={() => go("/")} />}
      >
        Регистрация
      </PanelHeader>
      <PullToRefresh onRefresh={refresh} isFetching={fetching}>
        {event && (
          <Group>
            <Cell
              before={<Avatar size={72} src={event.avatar} />}
              description={
                <>
                  <div>{new Date(event.timestamp).toLocaleString()}</div>
                </>
              }
              size="l"
            >
              {event.label}
            </Cell>
            <CellButton align='center' disabled={throttling} onClick={onSubmit}>Зарегистрироваться</CellButton>
          </Group>
        )}
      </PullToRefresh>
    </Panel>
  );
}
