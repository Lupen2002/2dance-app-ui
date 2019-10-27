// @flow

import React                        from "react";
import { View }                     from "@vkontakte/vkui";
import MainMainPanel                from "../../panels/main/main/MainMainPanel";
import { extractMainViewId }        from "./utils";

type P = {
  id: EpicViewId,
  panelId?: string
};

export const MainView = (p: P) => {
  const activePanel = extractMainViewId(p.panelId);

  return (
    <View activePanel={activePanel} id={p.id}>
      <MainMainPanel id="main" />
    </View>
  );
};
