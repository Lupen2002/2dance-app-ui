// @flow

import React, { useState }    from "react";
import {
  FormLayout,
  Textarea,
  Panel,
  Div,
  PanelHeader,
  Button
}                             from "@vkontakte/vkui";
import LeftPanelHeaderButtons from "../../../components/controlls/LeftPanelHeaderButtons";
import { back, go }           from "../../../utils/default/url";
import { getQueryParams }     from "hookrouter";
import { useEventById }       from "../../../hooks/useEventById";
import usePrice               from "../../../hooks/usePrice";
import { postTickets }        from "../../../api";

type P = {
  id: EventsViewId
};

export default function AltPayPanel(p: P) {
  const [comment, setComment] = useState(""),
        [event] = useEventById(getQueryParams().event_id),
    price = usePrice(event, getQueryParams().pass);

  const onSubmit = async () => {
    if (event && price) {
      const { event_id, pass, sec, vk_group_id, vk_user_id } = getQueryParams();
      const ticket: $Rest<Ticket, {| _id: string |}> = {
        ticketType: pass,
        vkGroupId: parseInt(vk_group_id),
        vkUserId: parseInt(vk_user_id),
        eventId: event_id,
        amount: price,
        isClose: false,
        secondUserId: pass === "double-pass" && sec ? parseInt(sec) : undefined,
        altPay: {
          createdAt: Date.now(),
          comment,
          approve: false
        }
      };
      await postTickets(ticket);
      go('/')
    }
  };

  return (
    <Panel id={p.id}>
      <PanelHeader left={<LeftPanelHeaderButtons back={back} type="back" />}>
        Оплата наличными
      </PanelHeader>
      {event && price && (
        <>
          <FormLayout>
            <Div>Напишите, кому и как оплатили, прикрепите скрин или чек.</Div>
            <Textarea
              top="Комментаий"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Укажите способ оплаты, кому оплатили"
            />
            <Button disabled={comment.length < 4} size="xl" onClick={onSubmit}>
              Отправить
            </Button>
          </FormLayout>
        </>
      )}
    </Panel>
  );
}
