// @flow

import React from "react";
import {
  Cell,
  Group,
  InfoRow,
  List,
  Panel,
  PanelHeader,
  View
} from "@vkontakte/vkui";
import useCurrentGroup from "../../hooks/useCurrentGroup";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import vkConnect from "@vkontakte/vkui-connect-promise";
import useStartParams from "../../hooks/useStartParams";
import { postTickets } from "../../api";
import useMyTickets from "../../hooks/useMyTickets";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import QRCode from "qrcode.react";

type P = {
  id: EpicViewId
};

export const MainView = (p: P) => {
  const name = useCurrentGroup(),
    params = useStartParams(),
    ticket = useMyTickets();

  const payToGroup = (ticketType: TicketType) => async () => {
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
          vkUserId: parseInt(params.vk_user_id),
          toDate: process.env.REACT_APP_TO_DATE || "01.01.2000",
          transactionId: res.data.transaction_id,
          amount: res.data.amount,
          extra: res.data.extra
        };
        console.log(await postTickets(ticket));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View activePanel="main" id={p.id}>
      <Panel id={"main"}>
        <PanelHeader>{name}</PanelHeader>
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
                <Cell size="l">
                  <InfoRow title="QR-code">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <QRCode value={ticket._id} />
                    </div>
                  </InfoRow>
                </Cell>
              </List>
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
    </View>
  );
};
