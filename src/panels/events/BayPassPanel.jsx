// @flow

import React, { useState, useEffect } from "react";
import { Cell, Group, List, Panel, PanelHeader } from "@vkontakte/vkui";
import { getQueryParams, navigate, setQueryParams } from "hookrouter";
import LeftPanelHeaderButtons from "../../components/controlls/LeftPanelHeaderButtons";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import vkConnect from "@vkontakte/vkui-connect-promise";
import { getEvents, postTickets } from "../../api";

type P = {
  id: EventsViewId
};

export const BayPassPanel = (p: P) => {
  const eventId = getQueryParams().event_id;
  useEffect(() => {
    setQueryParams({
      ...getQueryParams(),
      pass: undefined,
      sec: undefined
    });
  }, []);
  const [event, setEvent] = useState();

  useEffect(() => {
    getEvents(eventId).then(res => setEvent(res[0]));
  }, [eventId]);

  const payToGroup = (ticketType: TicketType) => () => {
    const query = getQueryParams();
    if (ticketType === "double-pass") {
      navigate("/events/second-user", false, { ...query, pass: ticketType });
    } else {
      navigate("/events/pay", false, { ...query, pass: ticketType });
    }
  };

  return (
    <Panel id={p.id}>
      <PanelHeader
        left={
          <LeftPanelHeaderButtons
            type="back"
            back={() => navigate("/events/main", false, getQueryParams())}
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
              {event.singlePrice > 0 && (
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
              )}
              {event.doublePrice > 0 && (
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
              )}
            </List>
          </Group>
        </>
      )}
    </Panel>
  );
};
