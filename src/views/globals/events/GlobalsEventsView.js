// @flow

import React                 from "react";
import { View }              from "@vkontakte/vkui";
import { extractMainViewId } from "./utils";
import MainEventsPanel       from "../../../panels/global/events/main/MainEventsPanel";
import ByCityPanel           from "../../../panels/global/events/by-city/ByCityPanel";

type P = {
  id: EpicGlobalViewId,
  activePanel?: string,
  param?: string
};

export default function GlobalsEventsView(p: P) {
  const activePanel = extractMainViewId(p.activePanel);

  return (
    <View activePanel={activePanel} id={p.id}>
      <MainEventsPanel id="main" cityId={p.param} />
      <ByCityPanel id='city-select' />
    </View>
  );
}
