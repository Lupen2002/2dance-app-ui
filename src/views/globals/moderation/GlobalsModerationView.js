// @flow

import React, { useState }   from "react";
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

  const [modal, setModal] = useState(null),
        [popout, setPopout] = useState(null);

  return (
    <View activePanel={activePanel} id={p.id} modal={modal} popout={popout}>
      <ModerationPanel id="moderation" />
      <MainSettingsPanel id='main' setModal={setModal}/>
    </View>
  );
}
