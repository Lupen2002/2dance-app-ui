// @flow

import React, { useState } from "react";
import { View }               from "@vkontakte/vkui";
import { MainEventsPanel }    from "../../panels/events/main/MainEventsPanel";
import { extractEventViewId } from "./utils";
import { BayPassPanel }     from "../../panels/events/BayPassPanel";
import { EventsSecondUser } from "../../panels/events/second-user/EventsSecondUser";
import { PayEvents }        from "../../panels/events/pay/PayEvents";
import YMSuccess            from "../../panels/events/ym-success/YMSuccess";
import EventEdit            from "../../panels/events/edit/EventEdit";
import ListGuestPanel       from "../../panels/events/list-guests/ListGuestsPanel";
import AltPayPanel          from "../../panels/events/alt-pay/AltPayPanel";
import RegOnReceptionPanel  from "../../panels/events/reg-on-reception/RegOnReceptionPanel";

type P = {
  id: EpicViewId,
  panelId?: string
};

export const EventsView = (p: P) => {
  const panelId = extractEventViewId(p.panelId);
  const [popout, setPopout] = useState<?React$Node>(null);

  return (
    <View id={p.id} activePanel={panelId} popout={popout}>
      <MainEventsPanel id="main" activePanel={panelId} setPopout={setPopout} />
      <BayPassPanel id="bay-pass" activePanel={panelId} />
      <EventsSecondUser id="second-user" activePanel={panelId} />
      <PayEvents id="pay" activePanel={panelId} />
      <YMSuccess id="ym-success" activePanel={panelId} />
      <EventEdit id="edit" activePanel={panelId} />
      <ListGuestPanel id="list-guests" activePanel={panelId}/>
      <AltPayPanel id="alt-pay" activePanel={panelId}/>
      <RegOnReceptionPanel id='reg-on-reception' activePanel={panelId}/>
    </View>
  );
};
