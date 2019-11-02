// @flow

import React, { useState, useEffect } from "react";
import { Cell, CellButton, Group, List, Panel } from "@vkontakte/vkui";
import { PanelHeader } from "@vkontakte/vkui";
import LeftPanelHeaderButtons from "../../../components/controlls/LeftPanelHeaderButtons";
import { getQueryParams, navigate } from "hookrouter";
import { getEvents, postTickets } from "../../../api";
import useVkUser from "../../../hooks/useVkUser";
import useUserToken from "../../../hooks/useUserToken";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import { UserCell } from "../../main/main/UserCell";
import vkConnect from "@vkontakte/vkui-connect-promise";
import { back, go } from "../../../utils/default/url";
import useYMoneyReceiver from "../../../hooks/useYMoneyReceiver";
import Corazon150 from "../../../assets/imgs/Corazon150.png";
import usePrice from "../../../hooks/usePrice";
import YandexMoneyButton from "./YandeMoneyButton";

type P = {
  id: EventsViewId
};

export const PayEvents = (p: P) => {
  const { event_id, pass, sec, ...query } = getQueryParams();
  const [event, setEvent] = useState<?DanceEvent>(),
    user: ?VKUser = useVkUser(),
    token = useUserToken(true);
  const price = usePrice(event, pass);

  useEffect(() => {
    getEvents(event_id).then(res => setEvent(res[0]));
    if (window.ym) {
      window.ym(55883914, "reachGoal", "open-event-pay");
    }
  }, [event_id]);

  const vkPay = async () => {
    if (query && pass && query.vk_group_id && user && token && event) {
      try {
        const res = await vkConnect.send("VKWebAppOpenPayForm", {
          app_id: 7062331,
          action: "pay-to-group",
          params: {
            amount: price,
            group_id: parseInt(query.vk_group_id)
          }
        });
        if (res.type === "VKWebAppOpenPayFormResult" && res.data.status) {
          const ticket: $Rest<Ticket, {| _id: string |}> = {
            ticketType: pass,
            vkGroupId: parseInt(query.vk_group_id),
            vkUserId: user.id,
            eventId: event._id,
            transactionId: res.data.transaction_id,
            amount: res.data.amount,
            extra: res.data.extra,
            isClose: false,
            secondUserId:
              pass === "double-pass" && sec ? parseInt(sec) : undefined
          };
          if (window.ym) {
            window.ym(55883914, "reachGoal", "pay-ticket", {
              order_price: res.data.amount
            });
          }
          await postTickets(ticket);
          if (pass === "double-pass") {
            await postTickets({
              ticketType: pass,
              vkGroupId: parseInt(query.vk_group_id),
              vkUserId: parseInt(sec),
              secondUserId: user.id,
              eventId: event._id,
              transactionId: res.data.transaction_id,
              amount: res.data.amount,
              extra: res.data.extra,
              isClose: false
            });
          }
          navigate("/", false, query);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <Panel id={p.id}>
      <PanelHeader left={<LeftPanelHeaderButtons type="back" back={back} />}>
        Оплата
      </PanelHeader>
      {event && user && (
        <>
          <Group>
            <Cell
              before={<Avatar size={72} src={Corazon150} />}
              description={
                <>
                  <div>{new Date(event.timestamp).toLocaleString()}</div>
                  <div>{price} ₽</div>
                </>
              }
              size="l"
            >
              {event.label}
            </Cell>
          </Group>
          {query && pass === "double-pass" && sec && (
            <Group title="Мой +1">
              <UserCell userId={parseInt(sec)} />
            </Group>
          )}
          <Group>
            <List>
              <CellButton onClick={vkPay}>VkPay</CellButton>
              <YandexMoneyButton user={user} event={event} />
              <CellButton onClick={() => go("/events/alt-pay")}>
                Наличными
              </CellButton>
            </List>
          </Group>
        </>
      )}
    </Panel>
  );
};
