// @flow

import React from "react";
import { Epic } from "@vkontakte/vkui";
import GlobalsMainView from "../../views/globals/main/GlobalsMainView";

type P = {
  epicId: string,
  panelId?: string
};

export default function GlobalEpic(p: P) {
  console.log('!!! GlobalEpic');
  return (
    <Epic activeStory={p.epicId}>
      <GlobalsMainView id="main" activePanel={p.panelId} />
    </Epic>
  );
}
