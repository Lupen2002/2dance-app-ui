// @flow

import React, { useState, useEffect } from "react";
import { Cell, Group, List, Panel, PanelHeader } from "@vkontakte/vkui";
import { getQueryParams, navigate, setQueryParams } from "hookrouter";
import LeftPanelHeaderButtons from "../../components/controlls/LeftPanelHeaderButtons";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import vkConnect from "@vkontakte/vkui-connect-promise";
import { getEvents, postTickets } from "../../api";
import { back } from "../../utils/default/url";

import Corazon150 from "../../assets/imgs/Corazon150.png";

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
      <PanelHeader left={<LeftPanelHeaderButtons type="back" back={back} />}>
        Оплата
      </PanelHeader>
      {event && (
        <>
          <Group>
            <Cell
              before={<Avatar size={72} src={Corazon150} />}
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
                  before={
                    <div style={{padding: '12px 12px 12px 0', color: '#5181B8'}}>
                      <i className="fas fa-user fa-2x" />
                    </div>
                  }
                  size="l"
                  description={`Цена: ${event.singlePrice}`}
                  onClick={payToGroup("single-pass")}
                  bottomContent={
                    <div style={{ display: "flex" }}>
                      <Button size="m">Оплатить</Button>
                    </div>
                  }
                >
                  Оплатить за одного
                </Cell>
              )}
              {event.doublePrice > 0 && (
                <Cell
                  before={<div style={{padding: '12px 12px 12px 0', color: '#5181B8'}}><i className="fas fa-user-friends fa-2x" /></div>}
                  size="l"
                  description={`Цена: ${event.doublePrice}`}
                  bottomContent={
                    <div style={{ display: "flex" }}>
                      <Button size="m" onClick={payToGroup("double-pass")}>
                        Оплатить
                      </Button>
                    </div>
                  }
                >
                  Оплатить за пару
                </Cell>
              )}
            </List>
          </Group>
        </>
      )}
    </Panel>
  );
};
