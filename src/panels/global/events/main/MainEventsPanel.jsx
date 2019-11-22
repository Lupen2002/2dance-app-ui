// @flow
import * as _ from "lodash";
import React, { useMemo, useState } from "react";
import { InfoRow, PullToRefresh } from "@vkontakte/vkui";
import { Group, List, Panel } from "@vkontakte/vkui";
import { PanelHeader, PanelSpinner, Cell } from "@vkontakte/vkui";
import useGroups from "./hooks/useGroups";
import GroupEventCell from "./GroupEventCell";
import Moment from "react-moment";
import useNavigate from "../../../../hooks/useNavigate";
import useUserById from "../../../../hooks/useUserById";
import useUserToken from "../../../../hooks/useUserToken";
import useCityById from "../../../../hooks/useCityById";

type P = {
  id: string,
  cityId?: string
};

export default function MainEventsPanel(p: P) {
  const token = useUserToken(),
    [go, params] = useNavigate(),
    [user: ?User] = useUserById(parseInt(params.vk_user_id), token);

  const cityId: number | void = useMemo(() => {
      return p.cityId
        ? parseInt(p.cityId)
        : user && user.vkUser.city && user.vkUser.city.id;
    }, [p.cityId, user]),
    [city] = useCityById(cityId);

  const [groups, fetching, refresh] = useGroups(cityId);
  const [accent, setAccent] = useState(null);

  const groupOnDay = useMemo(() => {
    if (groups) {
      return _.chain(groups)
        .filter(g => g && g.start_date)
        .map((g: VkGroup) => {
          return {
            ...g,
            date: new Date(g.start_date * 1000).toDateString()
          };
        })
        .groupBy("date")
        .toPairs()
        .map(([date, gs]) => [gs, gs[0].start_date * 1000])
        .value();
    } else {
      return [];
    }
  }, [groups]);

  return (
    <Panel id="main">
      <PanelHeader>Все события</PanelHeader>
      {!(groups && city)  && <PanelSpinner />}
      <PullToRefresh onRefresh={refresh} isFetching={fetching}>
        {city && (
          <Group>
            <Cell onClick={() => go("/global-events/city-select")}>
              <InfoRow title="Текущий город">{city.title}</InfoRow>
            </Cell>
          </Group>
        )}
        {groups && city && groupOnDay &&
          groupOnDay.map(([gs, date]) => (
            <Group
              title={
                <Moment locale="ru" format="dd | DD MMMM YYYY" date={date} />
              }
            >
              <List>
                {gs &&
                  gs.map((g: VkGroup) => (
                    <GroupEventCell
                      key={"event-group-" + g.id}
                      accent={accent}
                      onClose={() => setAccent(null)}
                      onOpen={() => setAccent(g.id)}
                      group={g}
                    />
                  ))}
              </List>
            </Group>
          ))}
      </PullToRefresh>
    </Panel>
  );
}
