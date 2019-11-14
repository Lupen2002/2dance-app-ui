// @flow

import React                 from "react";
import { View }              from "@vkontakte/vkui";
import { extractMainViewId } from "./utils";
import ModerationPanel       from "../../../panels/global/settings/moderation/ModerationPanel";
import MainSettingsPanel     from "../../../panels/global/settings/main/MainSettingsPanel";

 type P = {
  id: EpicGlobalViewId,
  activePanel?: string
};

export default function GlobalsModerationView(p: P) {
  const activePanel = extractMainViewId(p.activePanel);

  return (
    <View activePanel={activePanel} id={p.id}>
      <ModerationPanel id="moderation" />
      <MainSettingsPanel id='main' />
    </View>
  );
}
