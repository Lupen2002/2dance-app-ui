// @flow

import React, { useMemo }                   from "react";
import { Panel, PanelHeader, PanelSpinner } from "@vkontakte/vkui";
import LeftPanelHeaderButtons               from "../../../components/controlls/LeftPanelHeaderButtons";
import { getQueryParams }                   from "hookrouter";
import { postEvents }                       from "../../../api";
import { dateLocal2ISO }                    from "../../events/edit/utils";
import EventForm                            from "../../events/edit/EventForm";
import { getLocalDate }                     from "../../../utils/default/date";
import { back, go }                         from "../../../utils/default/url";
import useCurrentGroup                      from "../../../hooks/useCurrentGroup";

type ExcludeDanceEvent = {| _id: string |};
type NDanceEvent = $Rest<DanceEvent, ExcludeDanceEvent>;

type P = {
  id: MenuViewId
};

const defaultEvent = (id: number): NDanceEvent => ({
  timestamp: getLocalDate(
    dateLocal2ISO(new Date().toLocaleDateString()) + "T20:00:00"
  ).getTime(),
  vkGroupId: id,
  label: "",
  singlePrice: 0,
  doublePrice: 0,
  rePostControl: false,
  postUrl: ""
});

export const AddEventPanel = (p: P) => {
  const { vk_group_id } = getQueryParams(),
        [group] = useCurrentGroup();
  const event = useMemo(() => {
    if (group) {
      const event = defaultEvent(parseInt(vk_group_id));
      return {...event, avatar: group.photo_200}
    }
  }, [vk_group_id, group]);

  const post = (event: DanceEvent) => {
    if (vk_group_id) {
      postEvents(event).then(() => go("/events"));
    }
  };

  return (
    <Panel id={p.id}>
      <PanelHeader left={<LeftPanelHeaderButtons type="cancel" back={back} />}>
        Новое событие
      </PanelHeader>
      {!event && <PanelSpinner/>}
      {event && <EventForm event={event} onSubmit={post} />}
    </Panel>
  );
};
