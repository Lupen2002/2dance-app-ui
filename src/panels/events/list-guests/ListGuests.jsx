// @flow

import React from "react";
import { Avatar, Cell, CellButton, Group, List } from "@vkontakte/vkui";
import useEventsGuests from "../../../hooks/useEventsGuests";
import useGuestsCSV from "./useGuestsCSV";
import useNavigate from "../../../hooks/useNavigate";

type P = {
  event: DanceEvent
};

type GuestInfo = {
  user: GuestUserInfo,
  isVisit: boolean
};

export default function ListGuests(p: P) {
  const [go, params] = useNavigate(),
    guests: ?(GuestInfo[]) = useEventsGuests(p.event),
    csv = useGuestsCSV(guests);

  return (
    <>
      <Group>
        <CellButton
          component="a"
          download={p.event._id}
          href={"data:text/csv," + csv}
        >
          <i className="fas fa-download" /> Выгрузить в CSV
        </CellButton>
        <CellButton onClick={() => go("/events/add-guest")}>
          <i className="fas fa-plus" /> Добавить гостя
        </CellButton>
      </Group>
      <Group>
        {guests && (
          <List>
            {guests.map((g, i) => (
              <Cell
                key={`guest-${i}`}
                asideContent={g.isVisit ? <i className="fas fa-check" /> : ""}
                before={
                  <>
                    {g.user.photo_100 ? (
                      <Avatar size={40} src={g.user.photo_100} />
                    ) : (
                      <Avatar size={40}>
                        <i className="fas fa-user-secret" />
                      </Avatar>
                    )}
                  </>
                }
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
