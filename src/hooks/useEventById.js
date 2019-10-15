// @flow

import { useState, useEffect } from "react";
import { getEvents } from "../api";

export function useEventById(id: ?string): ?DanceEvent {
  const [event, setEvent] = useState<?DanceEvent>(null);

  useEffect(() => {
    if (id) {
      getEvents(id).then((res: DanceEvent[]) => {
        const find = res.find(e => e._id === id);
        find && setEvent(find);
      });
    }
  }, [id]);

  return event;
}
