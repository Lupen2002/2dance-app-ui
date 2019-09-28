// @flow

import React                        from 'react'
import { Panel, PanelHeader, View } from "@vkontakte/vkui";

type P = {
  id: EpicViewId
}

export const EventsView = (p: P) => {
  return (
    <View id={p.id} activePanel='main'>
      <Panel id='main'>
        <PanelHeader>Вечеринки</PanelHeader>
      </Panel>
    </View>
  )
};