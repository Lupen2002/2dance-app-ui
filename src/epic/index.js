// @flow

import React from "react";
import { AppTabbar } from "./tabbar";
import { MainView } from "../views/main/MainView";
import { Epic } from "@vkontakte/vkui";
import { extractEpicViewId } from "./utils";
import { MenuView } from "../views/menu/MenuView";
import { EventsView } from "../views/events/EventsView";
import { CheckView } from "../views/check/CheckView";

type P = {
  epicId?: string,
  panelId?: string
};

export const RootEpic = (p: P) => {
  const id: EpicViewId = extractEpicViewId(p.epicId);

  return (
    <Epic activeStory={id} tabbar={<AppTabbar selected={id} />}>
      <MainView id="main" panelId={p.panelId} />
      <MenuView id="menu" panelId={p.panelId} />
      <EventsView id="events" panelId={p.panelId} />
      <CheckView id="check-params" />
    </Epic>
  );
};
