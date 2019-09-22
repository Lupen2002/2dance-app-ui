// @flow

import React, { useState } from "react";
import { Cell, Group, InfoRow } from "@vkontakte/vkui";
import { List, Panel, PanelHeader } from "@vkontakte/vkui";
import LeftPanelHeaderButtons from "../../../components/controlls/LeftPanelHeaderButtons";
import QRCode from "qrcode.react";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import useCurrentGroup from "../../../hooks/useCurrentGroup";
import useStartParams from "../../../hooks/useStartParams";
import useMyTickets from "../../../hooks/useMyTickets";
import vkConnect from "@vkontakte/vkui-connect-promise";
import { postTickets } from "../../../api";
import { getQueryParams, navigate } from "hookrouter";
import { UserCell } from "./UserCell";

type P = {
  id: MainViewId
};

export default function MainMainPanel(p: P) {
  const [transaction, setTransaction] = useState<?string>(null);

  const name = useCurrentGroup(),
    params = useStartParams(),
    ticket = useMyTickets(transaction);

  const payToGroup = (ticketType: TicketType) => async () => {
    if (ticketType === "double-pass") {
      navigate("/main/second-user", false, getQueryParams());
      return;
    }
    try {
      const res = await vkConnect.send("VKWebAppOpenPayForm", {
        app_id: 7062331,
        action: "pay-to-group",
        params: {
          amount: 1,
          group_id: parseInt(params.vk_group_id)
        }
      });
      if (res.type === "VKWebAppOpenPayFormResult" && res.data.status) {
        const ticket: $Rest<Ticket, { _id: string }> = {
          ticketType,
          groupId: parseInt(params.vk_group_id),
          vkUserId: parseInt(params.vk_user_id),
          toDate: process.env.REACT_APP_TO_DATE || "01.01.2000",
          transactionId: res.data.transaction_id,
          amount: res.data.amount,
          extra: res.data.extra
        };
        await postTickets(ticket);
        setTransaction(res.data.transaction_id);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Panel id={p.id}>
      <PanelHeader left={<LeftPanelHeaderButtons />}>{name || "!"}</PanelHeader>
      {ticket && (
        <>
          <Group title="Информация о билете">
            <List>
              <Cell>
                <InfoRow title="Тип билета">{ticket.ticketType}</InfoRow>
              </Cell>
              <Cell>
                <InfoRow title="Дата действия">{ticket.toDate}</InfoRow>
              </Cell>
              {ticket.secondUserId && <UserCell userId={ticket.secondUserId} />}
            </List>
          </Group>
          <Group title="QR-code">
            <Cell size="l">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <QRCode value={ticket._id} />
              </div>
            </Cell>
          </Group>
        </>
      )}
      {!ticket && (
        <Group>
          <List>
            <Cell
              before={<Avatar size={72} />}
              size="l"
              bottomContent={
                <div style={{ display: "flex" }}>
                  <Button size="m" onClick={payToGroup("single-pass")}>
                    Купить
                  </Button>
                </div>
              }
            >
              Одиночный пасс
            </Cell>
            <Cell
              before={<Avatar size={72} />}
              size="l"
              bottomContent={
                <div style={{ display: "flex" }}>
                  <Button size="m" onClick={payToGroup("double-pass")}>
                    Купить
                  </Button>
                </div>
              }
            >
              Парный пасс
            </Cell>
            <Cell
              before={<Avatar size={72} />}
              size="l"
              bottomContent={
                <div style={{ display: "flex" }}>
                  <Button size="m" onClick={payToGroup("group-pass")}>
                    Купить
                  </Button>
                </div>
              }
            >
              Групповой пасс
            </Cell>
          </List>
        </Group>
      )}
    </Panel>
  );
}
