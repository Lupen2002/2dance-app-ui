// @flow

import React, { useMemo }     from "react";
import {
  CellButton,
  Group,
  Panel,
  PanelHeader,
  Cell,
  PanelSpinner
}                             from "@vkontakte/vkui";
import LeftPanelHeaderButtons from "../../../components/controlls/LeftPanelHeaderButtons";
import { back }               from "../../../utils/default/url";
import TicketInfo             from "../../main/main/TicketInfo";
import useTicketById          from "../../../hooks/useTicketById";
import useStartParams         from "../../../hooks/useStartParams";
import { putTickets }         from "../../../api";
import { getQueryParams }     from "hookrouter";

type P = {
  id: MenuViewId
};

export default function CheckTicketPanel(p: P) {
  const params:StartParams = getQueryParams();
  const ticket = useTicketById(params.ticket_id);

  const onCloseTicket = useMemo(
    () => async () => {
      if (ticket) {
        const {event, ...newTicket} = ticket;

        await putTickets({
          ...newTicket,
          isClose: true
        });
        back();
      }
    },
    [ticket]
  );

  return (
    <Panel id={p.id}>
      <PanelHeader left={<LeftPanelHeaderButtons type="back" back={back} />}>
        Проверка билета
      </PanelHeader>
      {!ticket && <PanelSpinner />}
      {ticket && !ticket.isClose && (
        <>
          <TicketInfo ticket={ticket} />
          <Group>
            <CellButton level="danger" onClick={onCloseTicket}>
              Закрыть билет
            </CellButton>
          </Group>
        </>
      )}
      {ticket && ticket.isClose && (
        <Group>
          <Cell>
            🐇 Данный билет уже использован!
          </Cell>
          <TicketInfo ticket={ticket} />
        </Group>
      )}
    </Panel>
  );
}
