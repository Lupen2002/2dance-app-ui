// @flow

import React            from "react";
import useNavigate      from "../../../hooks/useNavigate";
import useUserById      from "../../../hooks/useUserById";
import { Cell, Avatar } from "@vkontakte/vkui";
import useUserToken     from "../../../hooks/useUserToken";

type P = {
  ticket: RichTicket
};

export default function UserTicketCell(p: P) {
  const token = useUserToken(false),
    [user] = useUserById(p.ticket.vkUserId, token);

  return (
    <>
      {user && (
        <Cell before={<Avatar size={32} src={user.vkUser.photo_100} />} indicator={'Оплачено: ' + p.ticket.ticketType}>
          {user.vkUser.first_name} {user.vkUser.last_name}
        </Cell>
      )}
    </>
  );
}
