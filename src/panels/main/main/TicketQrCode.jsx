// @flow

import React from "react";
import { Cell } from "@vkontakte/vkui";
import QRCode from "qrcode.react";

type P = {
  ticket: Ticket | RichTicket
};

export default function TicketQrCode(p: P) {
  return (
    <>
      {!p.ticket.isClose && (
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
      )}
      {p.ticket.isClose && (
        <Cell>
          Данный билет уже использован!
        </Cell>
      )}
    </>
  );
}
