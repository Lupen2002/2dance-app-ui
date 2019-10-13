// @flow

import React from "react";
import { Cell, Group, InfoRow, List } from "@vkontakte/vkui";
import QRCode from "qrcode.react";
import { UserCell } from "./UserCell";

type P = {
  ticket: RichTicket
};

export default function TicketInfo(p: P) {
  if (p.ticket.ticketType === "single-pass") {
    return (
      <Group title={p.ticket.event.label}>
        <List>
          <Cell>
            <InfoRow title="Дата">
              {new Date(p.ticket.event.timestamp).toLocaleString()}
            </InfoRow>
          </Cell>
          <Cell>
            <InfoRow title="Тип пасса">{p.ticket.ticketType}</InfoRow>
          </Cell>
          {p.ticket.transactionId || p.ticket.ymOperationId ? (
            <Cell size="l">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "5vh"
                }}
              >
                <QRCode value={p.ticket._id} />
              </div>
            </Cell>
          ) : (
            <Cell>
              <InfoRow title="Статус">Ожидаеться подтверждения оплаты {p.ticket.transactionId} - {p.ticket.ymOperationId}</InfoRow>
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
              {new Date(p.ticket.event.timestamp).toLocaleString()}
            </InfoRow>
          </Cell>
          <Cell>
            <InfoRow title="Тип пасса">{p.ticket.ticketType}</InfoRow>
          </Cell>
          {p.ticket.secondUserId && <UserCell userId={p.ticket.secondUserId} />}
          {p.ticket.transactionId || p.ticket.ymOperationId ? (
            <Cell size="l">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "7vh"
                }}
              >
                <QRCode value={p.ticket._id} />
              </div>
            </Cell>
          ) : (
            <Cell>
              <InfoRow title="Статус">Ожидаеться подтверждения оплаты {p.ticket.transactionId} - {p.ticket.ymOperationId}</InfoRow>
            </Cell>
          )}
        </List>
      </Group>
    );
  } else {
    return <></>;
  }
}
