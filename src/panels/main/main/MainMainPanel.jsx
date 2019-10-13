// @flow

import React from "react";
import QRCode from "qrcode.react";
import { Cell, Group, InfoRow } from "@vkontakte/vkui";
import { List, Panel, PanelHeader } from "@vkontakte/vkui";
import LeftPanelHeaderButtons from "../../../components/controlls/LeftPanelHeaderButtons";
import useCurrentGroup from "../../../hooks/useCurrentGroup";
import { useEvents } from "../../../hooks/useEvents";
import useMyTickets from "../../../hooks/useMyTickets";
import TicketInfo from "./TicketInfo";

type P = {
  id: MainViewId
};

export default function MainMainPanel(p: P) {
  const name = useCurrentGroup(),
    events = useEvents(),
    tickets = useMyTickets(events);

  return (
    <Panel id={p.id}>
      <PanelHeader left={<LeftPanelHeaderButtons />}>{name || "!"}</PanelHeader>
      {tickets &&
        tickets.map(t => (
          <TicketInfo key={`ticket-info-${t._id}`} ticket={t} isQrCode />
        ))}
    </Panel>
  );
}
