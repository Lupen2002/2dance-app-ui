// @flow

import React from "react";
import { Avatar, Cell, CellButton, Group, List } from "@vkontakte/vkui";
import useEventsGuests from "../../../hooks/useEventsGuests";
import useGuestsCSV from "./useGuestsCSV";

type P = {
  event: DanceEvent
};

type GuestInfo = {
  user: VKUser,
  isVisit: boolean
};

export default function ListGuests(p: P) {
  const guests: ?(GuestInfo[]) = useEventsGuests(p.event),
    csv = useGuestsCSV(guests);

  return (
    <>
      <Group>
        <CellButton component='a' download={p.event._id} href={"data:text/csv," + csv}>
          Выгрузить в CSV
        </CellButton>
      </Group>
      <Group>
        {guests && (
          <List>
            {guests.map(g => (
              <Cell
                key={`guest-${g.user.id}`}
                asideContent={g.isVisit ? <i className="fas fa-check" /> : ""}
                before={<Avatar size={40} src={g.user.photo_100} />}
              >
                {g.user.first_name} {g.user.last_name}
              </Cell>
            ))}
          </List>
        )}
      </Group>
    </>
  );
}
