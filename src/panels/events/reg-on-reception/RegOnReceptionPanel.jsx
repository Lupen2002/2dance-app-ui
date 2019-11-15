// @flow
import React, { useState } from "react";
import { getQueryParams } from "hookrouter";
import {
  Cell,
  CellButton,
  Group,
  List,
  Panel,
  PanelHeader,
  PullToRefresh
} from "@vkontakte/vkui";
import LeftPanelHeaderButtons from "../../../components/controlls/LeftPanelHeaderButtons";
import { go }                 from "../../../utils/default/url";
import { useEventById }  from "../../../hooks/useEventById";
import Avatar            from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import { postTickets }   from "../../../api";
import usePrice          from "../../../hooks/usePrice";
import useMyTickets      from "../../../hooks/useMyTickets";
import UserTicketCell    from "./UserTicketCell";
import TicketInfo        from "../../main/main/TicketInfo";
import useConfigs        from "../../../hooks/useConfigs";
import YandexMoneyButton from "../pay/YandeMoneyButton";
import useNavigate       from "../../../hooks/useNavigate";
import useUserById       from "../../../hooks/useUserById";
import useUserToken      from "../../../hooks/useUserToken";

type P = {
  id: EventsViewId
};

export default function RegOnReceptionPanel(p: P) {
  const [go, params] = useNavigate(),
        token = useUserToken(false),
        [user] = useUserById(parseInt(params.vk_user_id), token),
    [event, refresh, fetching] = useEventById(params.event_id),
    [throttling, setThrottling] = useState(false),
    tickets = useMyTickets(event && [event]),
    price = usePrice(event, getQueryParams().pass),
      [configs] = useConfigs();

  const isYMoney = configs && configs.payKinds && configs.payKinds.find(p => p.name === 'yandex-money') && configs.payKinds.find(p => p.name === 'yandex-money').on;

  const onSubmit = async () => {
    setThrottling(true);
    if (event && price) {
      const { event_id, vk_group_id, vk_user_id } = getQueryParams();
      const ticket: $Rest<Ticket, {| _id: string |}> = {
        ticketType: "single-pass",
        vkGroupId: parseInt(vk_group_id),
        vkUserId: parseInt(vk_user_id),
        eventId: event_id,
        amount: price,
        isClose: true,
        altPay: {
          createdAt: Date.now(),
          comment: "",
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
        {tickets &&
          tickets.length > 0 &&
          tickets.map(t => (
            <TicketInfo key={`ticket-info-${t._id}`} ticket={t} isQrCode />
          ))}
        {event && tickets && tickets.length === 0 && (
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
            {isYMoney && user && <YandexMoneyButton user={user.vkUser} event={event} />}
            <CellButton align="left" disabled={throttling} onClick={onSubmit}>
              Зарегистрироваться (оплатить на ресепшене)
            </CellButton>
          </Group>
        )}
      </PullToRefresh>
    </Panel>
  );
}
