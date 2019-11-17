// @flow

import React, { useMemo } from "react";
import { Epic } from "@vkontakte/vkui";
import { getQueryParams } from "hookrouter";
import { AppTabbar } from "./tabbar";
import GlobalsEventsView from "../../views/globals/events/GlobalsEventsView";
import GlobalsModerationView from "../../views/globals/moderation/GlobalsModerationView";

type P = {
  epicId: string,
  panelId?: string,
  param?: string
};

export default function GlobalEpic(p: P) {

  return (
    <Epic activeStory={p.epicId} tabbar={<AppTabbar />}>
      <GlobalsModerationView id="global-settings" activePanel={p.panelId} />
      <GlobalsEventsView id="global-events" activePanel={p.panelId} param={p.param} />
    </Epic>
  );
}
