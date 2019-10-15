// @flow

import React, { useState, useEffect, useMemo } from "react";
import { Cell, CellButton, Group, List, Panel } from "@vkontakte/vkui";
import { PanelHeader } from "@vkontakte/vkui";
import LeftPanelHeaderButtons       from "../../../components/controlls/LeftPanelHeaderButtons";
import { getQueryParams, navigate } from "hookrouter";
import { getEvents, postTickets }   from "../../../api";
import useVkUser                    from "../../../hooks/useVkUser";
import useUserToken                 from "../../../hooks/useUserToken";
import Avatar                       from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import { UserCell }                 from "../../main/main/UserCell";
import vkConnect                    from "@vkontakte/vkui-connect-promise";
import uuid                         from "uuid";
import { back }                     from "../../../utils/default/url";
import useYMoneyReceiver            from "../../../hooks/useYMoneyReceiver";

type P = {
  id: EventsViewId
};

export const PayEvents = (p: P) => {
  const { event_id, pass, sec, ...query } = useMemo(getQueryParams, []);
  const [event, setEvent] = useState<?DanceEvent>(),
    user = useVkUser(),
        {config} = useYMoneyReceiver(),
    token = useUserToken(true);
  const id = useMemo(uuid, []);
  const hash = useMemo(
    () => window.location.search.substr(1) + "&r=ym-success&uuid=" + id,
    [id]
  );

  useEffect(() => {
    getEvents(event_id).then(res => setEvent(res[0]));
  }, [event_id]);

  const vkPay = async () => {
    if (query && pass && query.vk_group_id && user && token && event) {
      try {
        const res = await vkConnect.send("VKWebAppOpenPayForm", {
          app_id: 7062331,
          action: "pay-to-group",
          params: {
            amount:
              pass === "single-pass" ? event.singlePrice : event.doublePrice,
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

  const ymPay = (label: string) => () => {
    if (query && pass && query.vk_group_id && user && event) {
      postTickets({
        ticketType: pass,
        vkGroupId: parseInt(query.vk_group_id),
        vkUserId: user.id,
        eventId: event._id,
        uuid: label,
        isClose: false,
        ymAccepted: false,
        secondUserId:
          query && pass === "double-pass" && sec ? parseInt(sec) : undefined
      });
      if (pass === "double-pass") {
        postTickets({
          ticketType: pass,
          vkGroupId: parseInt(query.vk_group_id),
          vkUserId: parseInt(sec),
          secondUserId: user.id,
          eventId: event._id,
          uuid: label,
          isClose: false,
          ymAccepted: false
        });
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
              before={<Avatar size={72} />}
              description={new Date(event.timestamp).toLocaleString()}
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
              <CellButton onClick={vkPay}>Оплата VkPay</CellButton>
              {config && <form
                method="POST"
                action="https://money.yandex.ru/quickpay/confirm.xml"
              >
                <input type="hidden" name="receiver" value={config.yMoneyReceiver} />
                <input type="hidden" name="formcomment" value="Corazon" />
                <input type="hidden" name="short-dest" value="Corazon" />
                <input type="hidden" name="label" value={id} />
                <input type="hidden" name="quickpay-form" value="shop" />
                <input
                  type="hidden"
                  name="successURL"
                  value={"https://vk.com/app7062331_-179764761#" + hash}
                />
                <input type="hidden" name="targets" value="Оплата пасса" />
                <input
                  type="hidden"
                  name="sum"
                  value={
                    query.pass === "single-pass"
                      ? event.singlePrice
                      : event.doublePrice
                  }
                  data-type="number"
                />
                <input type="hidden" name="comment" value="" />
                <input type="hidden" name="paymentType" value="AC" />
                <CellButton onClick={ymPay(id)} type="submit">
                  Оплата Картой
                </CellButton>
              </form> }
            </List>
          </Group>
        </>
      )}
    </Panel>
  );
};
