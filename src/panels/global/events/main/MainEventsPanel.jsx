// @flow

import React, { useMemo, useState } from "react";
import { PullToRefresh } from "@vkontakte/vkui";
import { Group, List, Panel } from "@vkontakte/vkui";
import { PanelHeader, PanelSpinner } from "@vkontakte/vkui";
import useGroups from "./hooks/useGroups";
import GroupEventCell from "./GroupEventCell";

type P = {
  id: string,
  cityId?: string
};

export default function MainEventsPanel(p: P) {
  const cityId: number | void = useMemo(() => p.cityId && parseInt(p.cityId), [
    p.cityId
  ]);
  const [groups, fetching, refresh] = useGroups(cityId);
  const [accent, setAccent] = useState(null);

  return (
    <Panel id="main">
      <PanelHeader>Все события</PanelHeader>
      {!groups && <PanelSpinner />}
      <PullToRefresh onRefresh={refresh} isFetching={fetching}>
        <Group>
          <List>
            {groups &&
              groups.map((g: VkGroup) => (
                <GroupEventCell
                  key={'event-group-'+g.id}
                  accent={accent}
                  onClose={() => setAccent(null)}
                  onOpen={() => setAccent(g.id)}
                  group={g}
                />
              ))}
          </List>
        </Group>
      </PullToRefresh>
    </Panel>
  );
}
