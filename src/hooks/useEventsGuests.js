// @flow

import { useEffect, useState } from "react";
import useMyTickets            from "./useMyTickets";
import vkConnect               from "@vkontakte/vkui-connect-promise";
import useUserToken            from "./useUserToken";
import useAllTickets           from "./useAllTickets";

type GuestInfo = {
  user: VKUser,
  isVisit: boolean
};

const getUsers = (ids: string, token: string) => ({
  method: "users.get",
  params: { fields: "sex,photo_50", user_ids: ids, v: "5.102", access_token: token }
});

export default function useEventsGuests(event: DanceEvent) {
  const tickets = useAllTickets([event]),
        token = useUserToken(true),
        [guests, setGuests] = useState<?(GuestInfo[])>(null);

  useEffect(() => {
    if (token && tickets) {
      const userIds = tickets.map(t => t.vkUserId).join(",");
      vkConnect.send("VKWebAppCallAPIMethod", getUsers(userIds, token))
               .then( ({data}) => {
        const users: VKUser[] = data.response;
        const guests: GuestInfo[] = users.map(u => {
          const ticket:? RichTicket = tickets.find(t => t.vkUserId === u.id);
          return({
            user: u,
            isVisit: ticket ? ticket.isClose : false
          })
        });
        setGuests(guests)
      })
        .catch(console.error)
    }
  }, [tickets, token]);

  return guests
}
