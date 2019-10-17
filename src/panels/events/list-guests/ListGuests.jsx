// @flow

import React                         from "react";
import { Avatar, Cell, Group, List } from "@vkontakte/vkui";
import useEventsGuests               from "../../../hooks/useEventsGuests";

type P = {
  event: DanceEvent
};

type GuestInfo = {
  user: VKUser,
  isVisit: boolean
};

export default function ListGuests(p: P) {
  const guests:?GuestInfo[] = useEventsGuests(p.event);

  return <Group>
    {guests && (<List>
      {guests.map(g => (
        <Cell
          asideContent={g.isVisit ? <i className='fas fa-check'/> : ''}
          before={<Avatar size={40} src={g.user.photo_50} />}
        >
          {g.user.first_name} {g.user.last_name}
        </Cell>
      ))}
    </List>)}
  </Group>;
}
