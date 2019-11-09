// @flow

import React from "react";
import { Cell, Group, InfoRow, List } from "@vkontakte/vkui";
import { UserCell } from "./UserCell";
import { getLocalDate } from "../../../utils/default/date";
import TicketQrCode from "./TicketQrCode";

type P = {
  ticket: RichTicket,
  isQrCode?: boolean
};

export default function TicketInfo(p: P) {
  if (p.ticket.ticketType === "single-pass") {
    return (
      <Group title={p.ticket.event.label}>
        <List>
          <Cell>
            <InfoRow title="Дата">
              {getLocalDate(p.ticket.event.timestamp).toLocaleString()}
            </InfoRow>
          </Cell>
          <Cell>
            <InfoRow title="Тип пасса">{p.ticket.ticketType}</InfoRow>
          </Cell>
          {p.ticket.transactionId ||
          p.ticket.ymOperationId ||
          (p.ticket.altPay && p.ticket.altPay.approve) ? (
            <>
              {p.isQrCode ? (
                <TicketQrCode ticket={p.ticket} />
              ) : (
                <UserCell userId={p.ticket.vkUserId} />
              )}
            </>
          ) : (
            <Cell>
              <InfoRow title="Статус">
                Ожидаеться подтверждения оплаты {p.ticket.transactionId}
                {p.ticket.ymOperationId}
              </InfoRow>
            </Cell>
          )}
        </List>
      </Group>
    );
  } else if (p.ticket.ticketType === "double-pass" && p.ticket.secondUserId) {
    return (
      <Group title={p.ticket.event.label}>
        <List>
          <Cell>
            <InfoRow title="Дата">
              {getLocalDate(p.ticket.event.timestamp).toLocaleString()}
            </InfoRow>
          </Cell>
          <Cell>
            <InfoRow title="Тип пасса">{p.ticket.ticketType}</InfoRow>
          </Cell>
          {p.ticket.secondUserId && <UserCell userId={p.ticket.secondUserId} />}
          {p.ticket.transactionId ||
          p.ticket.ymOperationId ||
          (p.ticket.altPay && p.ticket.altPay.approve) ? (
            <>
              {p.isQrCode ? (
                <TicketQrCode ticket={p.ticket} />
              ) : (
                <UserCell userId={p.ticket.vkUserId} />
              )}
            </>
          ) : (
            <Cell>
              <InfoRow title="Статус">
                Ожидается подтверждение оплаты {p.ticket.transactionId}
                {p.ticket.ymOperationId}
              </InfoRow>
            </Cell>
          )}
        </List>
      </Group>
    );
  } else {
    return <></>;
  }
}
