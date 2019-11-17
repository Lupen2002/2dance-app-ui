// @flow

import React, { useMemo }                   from "react";
import { Panel, PanelHeader, PanelSpinner } from "@vkontakte/vkui";
import LeftPanelHeaderButtons               from "../../../components/controlls/LeftPanelHeaderButtons";
import { postEvents }     from "../../../api";
import { dateLocal2ISO }  from "../../events/edit/utils";
import EventForm          from "../../events/edit/EventForm";
import { getLocalDate }   from "../../../utils/default/date";
import { back }       from "../../../utils/default/url";
import useCurrentGroup    from "../../../hooks/useCurrentGroup";
import useNavigate        from "../../../hooks/useNavigate";

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
  const [group] = useCurrentGroup(),
        [go, params] = useNavigate();

  const event = useMemo(() => {
    if (group) {
      const event = defaultEvent(parseInt(params.vk_group_id));
      return {...event, avatar: group.photo_200}
    }
  }, [params.vk_group_id, group]);

  const post = (event: DanceEvent) => {
    if (params.vk_group_id) {
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
