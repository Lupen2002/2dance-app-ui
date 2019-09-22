// @flow

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Cell,
  Group,
  InfoRow,
  List,
  Panel,
  PanelHeader
} from "@vkontakte/vkui";
import LeftPanelHeaderButtons from "../../../components/controlls/LeftPanelHeaderButtons";
import { getQueryParams, navigate } from "hookrouter";
import { getTickets } from "../../../api";
import useUserToken from "../../../hooks/useUserToken";
import vkConnect from "@vkontakte/vkui-connect-promise";
import { UserCell } from "../main/UserCell";

type P = {
  id: MainViewId,
  ticketId?: string
};

export default function MainTicketPanel(p: P) {
  const [ticket, setTicket] = useState<?Ticket>(null),
    [users, setUsers] = useState(null),
    token = useUserToken(),
    query = getQueryParams();

  useEffect(() => {
    getTickets(p.ticketId).then((tickets: Ticket[]) => {
      const t = tickets[0];
      setTicket(t);
    });
  }, [p.ticketId]);

  useEffect(() => {
    if (token && ticket) {
      vkConnect
        .send("VKWebAppCallAPIMethod", {
          method: "users.get",
          params: {
            user_ids:
              ticket.vkUserId +
              (ticket.secondUserId ? `,${ticket.secondUserId}` : ""),
            fields: "photo_50",
            v: "5.101",
            access_token: token
          }
        })
        .then(({ data }) => {
          setUsers(data.response);
        });
    }
  }, [token, ticket]);

  return (
    <Panel id={p.id}>
      <PanelHeader
        left={
          <LeftPanelHeaderButtons
            type="back"
            back={() => navigate("/main/main", false, query)}
          />
        }
      >
        Инофрмация о билете
      </PanelHeader>
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
            </List>
          </Group>
          <Group title="Гости">
            <List>
              {users && users.map(u => (
                <Cell before={<Avatar size={40} src={u.photo_50}/>}>
                  {u.first_name} {u.last_name}
                </Cell>
              ))}
            </List>
          </Group>
        </>
      )}
    </Panel>
  );
}
