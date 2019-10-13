// @flow

import React                  from "react";
import { View }               from "@vkontakte/vkui";
import { MainEventsPanel }    from "../../panels/events/main/MainEventsPanel";
import { extractEventViewId } from "./utils";
import { BayPassPanel }       from "../../panels/events/BayPassPanel";
import { EventsSecondUser }   from "../../panels/events/second-user/EventsSecondUser";
import { PayEvents }          from "../../panels/events/pay/PayEvents";
import YMSuccess              from "../../panels/events/ym-success/YMSuccess";

type P = {
  id: EpicViewId,
  panelId?: string
};

export const EventsView = (p: P) => {
  const panelId = extractEventViewId(p.panelId);

  return (
    <View id={p.id} activePanel={panelId}>
      <MainEventsPanel id="main" />
      <BayPassPanel id='bay-pass' />
      <EventsSecondUser id='second-user' />
      <PayEvents id='pay'/>
      <YMSuccess id='ym-success'/>
    </View>
  );
};
