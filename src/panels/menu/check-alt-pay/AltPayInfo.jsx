// @flow

import { useEventById } from "../../../hooks/useEventById";
import useUserById                from "../../../hooks/useUserById";
import React                      from "react";
import {}                         from '@vkontakte/vkui'
import { Group, Cell }            from "@vkontakte/vkui";
import { List }                   from "@vkontakte/vkui";
import { Avatar }                 from "@vkontakte/vkui";
import { InfoRow }                from "@vkontakte/vkui";
import { getLocalDate }           from "../../../utils/default/date";
import { UserCell }               from "../../main/main/UserCell";
import { CellButton }             from "@vkontakte/vkui";
import { delTickets, putTickets } from "../../../api";

type P = {
  ticket: Ticket,
  token: string,
  onRefresh: () => any
}

export default function AltPayInfo(p: P) {
  const [event] = useEventById(p.ticket.eventId),
        user = useUserById(p.ticket.vkUserId, p.token);

  const onApprove = async () => {
    const altPay = {...p.ticket.altPay, approve: true};
    await putTickets({...p.ticket, altPay});
    p.onRefresh()
  };

  const onDecline = async () => {
    await delTickets(p.ticket);
    p.onRefresh()
  };

  return (
    <Group>
      {event && user &&(
      <List>
        <Cell size='l' before={<Avatar/>}>{event.label}</Cell>
        <Cell>
          <InfoRow title="Дата">
            {getLocalDate(event.timestamp).toLocaleString()}
          </InfoRow>
        </Cell>
        <Cell>
          <InfoRow title="Тип пасса">{p.ticket.ticketType}</InfoRow>
        </Cell>
        <UserCell userId={p.ticket.vkUserId} />
        <Cell description={p.ticket.altPay && p.ticket.altPay.comment}>
          Комментарий:
        </Cell>
        <CellButton align='center' onClick={onApprove}>Подтвердить</CellButton>
        <CellButton align='center' onClick={onDecline} level='danger'>Отклонить</CellButton>
      </List>)}
    </Group>
  )
}