// @flow

import React from "react";
import { View } from "@vkontakte/vkui";
import { Panel, PanelHeader } from "@vkontakte/vkui";
import { getQueryParams } from "hookrouter";

type P = {
  id: string,
};

export const CheckView = (p: P) => {

  return (
    <View id={p.id} activePanel='main'>
      <Panel id="main">
        <PanelHeader>Провекра</PanelHeader>
        {JSON.stringify(getQueryParams())}
      </Panel>
    </View>
  );
};
