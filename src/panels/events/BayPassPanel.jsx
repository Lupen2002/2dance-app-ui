// @flow

import React, { useState, useEffect } from "react";
import { Cell, Group, List, Panel, PanelHeader } from "@vkontakte/vkui";
import { getQueryParams, navigate } from "hookrouter";
import LeftPanelHeaderButtons from "../../components/controlls/LeftPanelHeaderButtons";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import vkConnect from "@vkontakte/vkui-connect-promise";
import { getEvents, postTickets } from "../../api";

type P = {
  id: EventsViewId
};

export const BayPassPanel = (p: P) => {
  const query = getQueryParams();
  const [event, setEvent] = useState();

  useEffect(() => {
    getEvents(query.event_id).then(res => setEvent(res[0]));
  }, [query.event_id]);

  const payToGroup = (ticketType: TicketType) => () => {
    if (ticketType === "double-pass") {
      navigate("/events/second-user", false, {...query, pass: ticketType});
    } else {
      navigate("/events/pay", false, {...query, pass: ticketType});
    }
  };

  return (
    <Panel id={p.id}>
      <PanelHeader
        left={
          <LeftPanelHeaderButtons
            type="back"
            back={() => navigate("/events/main", false, query)}
          />
        }
      >
        Купить пассы
      </PanelHeader>
      {event && (
        <>
          <Group>
            <Cell
              before={<Avatar size={72} />}
              description={new Date(event.timestamp).toLocaleString()}
              size="l"
            >
              {event.label}
            </Cell>
          </Group>
          <Group>
            <List>
              <Cell
                before={<Avatar size={72} />}
                size="l"
                description={`Цена: ${event.singlePrice}`}
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
                description={`Цена: ${event.doublePrice}`}
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
            </List>
          </Group>
        </>
      )}
    </Panel>
  );
};
