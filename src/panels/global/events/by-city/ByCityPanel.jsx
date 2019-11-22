// @flow

import React from "react";
import { Cell, Counter, Group, List } from "@vkontakte/vkui";
import { Panel, PanelHeader, PanelSpinner } from "@vkontakte/vkui";
import { PullToRefresh } from "@vkontakte/vkui";
import useNavigate from "../../../../hooks/useNavigate";
import useGroupCities from "../../settings/main/hooks/useGroupCities";

type P = {
  id: string
};

export default function ByCityPanel(p: P) {
  const [go] = useNavigate();
  const [cities, fetching, refresh] = useGroupCities();

  return (
    <>
      <Panel id={p.id}>
        <PanelHeader>События</PanelHeader>
        {!cities && <PanelSpinner />}
        {cities && (
          <PullToRefresh isFetching={fetching} onRefresh={refresh}>
            <Group title="Города">
              <List>
                {cities.map(c => (
                  <Cell
                    key={"city-" + c.id}
                    onClick={() => go("/global-events/main/" + c.id)}
                    indicator={<Counter>{c.count}</Counter>}
                  >
                    {c.title}
                  </Cell>
                ))}
              </List>
            </Group>
          </PullToRefresh>
        )}
      </Panel>
    </>
  );
}
