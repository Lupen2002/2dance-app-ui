// @flow

import React, { useMemo, useState } from "react";
import {
  Group,
  List,
  Panel,
  PanelHeader,
  PanelSpinner,
  PullToRefresh
}                                   from "@vkontakte/vkui";
import GroupEventCell               from "../main/GroupEventCell";
import useGroups                    from "../main/hooks/useGroups";

type P = {
  id: string,
  cityId: string
};

export default function ByCityPanel(p: P) {
  const cityId = useMemo(() => parseInt(p.cityId), [p.cityId]);
  const [groups, fetching, refresh] = useGroups(cityId);
  const [accent, setAccent] = useState(null);

  return (
    <>
      <Panel id={p.id}>
        <PanelHeader>События</PanelHeader>
        {!groups && <PanelSpinner />}
        <PullToRefresh onRefresh={refresh} isFetching={fetching}>
          <Group>
            <List>
              {groups &&
                groups.map((g: VkGroup) => (
                  <GroupEventCell
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
    </>
  );
}
