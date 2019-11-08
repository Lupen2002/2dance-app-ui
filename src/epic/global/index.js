// @flow

import React                              from 'react'
import { Epic, Panel, PanelHeader } from "@vkontakte/vkui";

type P = {
  id: string
}

export default function GlobalEpic(p: P) {

  return (
    <Epic activeStory={p.id}>
      <Panel>
        <PanelHeader>Все события</PanelHeader>

      </Panel>
    </Epic>
  )
}
