// @flow

import { useEffect, useState } from "react";
import useMyTickets from "./useMyTickets";
import vkConnect from "@vkontakte/vkui-connect-promise";
import useUserToken from "./useUserToken";
import useAllTickets from "./useAllTickets";
import { getUsersByParams, postUsers } from "../api";

type GuestInfo = {
  user: GuestUserInfo,
  isVisit: boolean
};

const getUsers = (ids: string, token: string) => ({
  method: "users.get",
  params: {
    fields: "sex,photo_100",
    user_ids: ids,
    v: "5.102",
    access_token: token
  }
});

const getUsersByTickets = async (tickets: RichTicket[], token: string) => {
  let users: GuestUserInfo[] = [];
  for (let t of tickets) {
    if (t.vkUserId) {
      const cacheUsers = await getUsersByParams({vkId: t.vkUserId});
      if (cacheUsers.length > 0) {
        users = [...users, cacheUsers[0].vkUser];
      }
    } else if (t.offlineUser){
      users = [...users, t.offlineUser]
    }
  }
  const existUsers = users.filter(u => !!u.id).map(u => u.id);
  const withVkUserTickets = tickets.filter(t => !!t.vkUserId);

  if (users.length < withVkUserTickets.length) {
    const userIds = withVkUserTickets.map(t => t.vkUserId).join(",");
    const { data } = await vkConnect.send(
      "VKWebAppCallAPIMethod",
      getUsers(userIds, token)
    );
    users = data.response;
    for (let u of users) {
      const existUser = existUsers.find(eu => eu === u.id);
      if (!existUser) {
        await postUsers({ vkUser: u, vkId: u.id, role: "user" });
      }
    }
  }

  return users;
};

export default function useEventsGuests(event: DanceEvent) {
  const tickets = useAllTickets([event]),
    token = useUserToken(),
    [guests, setGuests] = useState<?(GuestInfo[])>(null);

  useEffect(() => {
    if (token && tickets) {
      console.log('!!! useEventsGuests::getUsersByTickets::tickets', tickets);

      getUsersByTickets(tickets, token)
        .then(users => {
          console.log('!!! useEventsGuests::getUsersByTickets::users', users);
          const guests: GuestInfo[] = users.map(u => {
            const ticket: ?RichTicket = tickets.find(t => t.vkUserId === u.id);
            return {
              user: u,
              isVisit: ticket ? ticket.isClose : false
            };
          });
          console.log('!!! useEventsGuests::getUsersByTickets::guests', guests);
          setGuests(guests);
        })
        .catch(console.error);
    }
  }, [tickets, token]);

  return guests;
}
