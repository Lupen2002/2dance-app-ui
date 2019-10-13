// @flow

import React, { useMemo } from "react";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import { Cell } from "@vkontakte/vkui";
import EventCellDescription from "./EventCellDescription";
import EventCellBottomContent from "./EventCellBottomContent";

type P = {
  event: DanceEvent
};

export default function EventCell(p: P) {
  return (
    <Cell
      before={<Avatar size={72} />}
      description={<EventCellDescription event={p.event} />}
      bottomContent={<EventCellBottomContent event={p.event} />}
      size="l"
    >
      {p.event.label}
    </Cell>
  );
}
