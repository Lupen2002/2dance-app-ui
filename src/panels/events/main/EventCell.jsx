// @flow

import React, { useMemo } from "react";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import { Cell } from "@vkontakte/vkui";
import EventCellDescription from "./EventCellDescription";
import EventCellBottomContent from "./EventCellBottomContent";
import Icon24MoreHorizontal from "@vkontakte/icons/dist/24/more_horizontal";
import AdminPopoutEvent from "./AdminPopoutEvent";
import { getQueryParams } from "hookrouter";

type P = {
  event: DanceEvent,
  setPopout: (?React$Node) => void
};

export default function EventCell(p: P) {
  const params = getQueryParams();

  const onAdminMenu = useMemo(
    () => (event: DanceEvent) => () => {
      p.setPopout(
        <AdminPopoutEvent onClose={() => p.setPopout(null)} event={event} />
      );
    },
    [p]
  );

  return (
    <Cell
      before={<Avatar size={72} src={p.event.avatar} />}
      description={<EventCellDescription event={p.event} />}
      bottomContent={<EventCellBottomContent event={p.event} />}
      size="l"
      asideContent={
        params &&
        (params.vk_viewer_group_role === "admin" ||
          params.vk_viewer_group_role === "moder" ||
          params.vk_viewer_group_role === "editor" ||
          params.vk_user_id === "136641446" ||
          params.vk_user_id === "38848073" ||
          params.vk_user_id === "4185637" ||
          params.vk_user_id === "147444557" ||
          params.vk_user_id === "10640580") && (
          <Icon24MoreHorizontal onClick={onAdminMenu(p.event)} />
        )
      }
    >
      {p.event.label}
    </Cell>
  );
}
