// @flow

import React, { useMemo } from "react";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import { Cell } from "@vkontakte/vkui";
import EventCellDescription from "./EventCellDescription";
import EventCellBottomContent from "./EventCellBottomContent";
import Icon24MoreHorizontal from "@vkontakte/icons/dist/24/more_horizontal";
import AdminPopoutEvent from "./AdminPopoutEvent";
import { getQueryParams } from "hookrouter";

import Corazon150 from "../../../assets/imgs/Corazon150.png";
import shineparty from "../../../assets/imgs/shineparty.png";
import CorazonK from "../../../assets/imgs/CorazonK.png";

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

  const src =
    p.event._id === "B80J9EPc6tJMHhV4" || p.event._id === "LvlQwAQH2pOoYsSq"
      ? shineparty
      : p.event._id === "p8sVQy46ARYbyeje"
      ? CorazonK
      : Corazon150;

  return (
    <Cell
      before={<Avatar size={72} src={src} />}
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
