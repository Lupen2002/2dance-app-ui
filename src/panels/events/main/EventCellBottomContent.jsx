// @flow

import React, { useMemo } from "react";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import { getQueryParams, navigate } from "hookrouter";

type P = {
  event: DanceEvent
};

export default function EventCellBottomContent(p: P) {
  const go = useMemo(
    () => (panelId: EventsViewId, event: DanceEvent) => () => {
      if (event.doublePrice > 0) {
        navigate("/events/" + panelId, false, { event_id: event._id }, false);
      } else {
        navigate(
          "/events/pay",
          false,
          { event_id: event._id, pass: "single-pass" },
          false
        );
      }
    },
    []
  );
  return (
    <div>
      <Button disabled={p.event.singlePrice < 0} size="m" onClick={go("bay-pass", p.event)}>
        Записаться
      </Button>
    </div>
  );
}
