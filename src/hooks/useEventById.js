// @flow

import { useState, useMemo, useEffect } from "react";
import { getEvents } from "../api";

export function useEventById(id: ?string): [?DanceEvent, ()=>Promise<void>] {
  const [event, setEvent] = useState<?DanceEvent>(null);

  const refresh = useMemo(() => async () => {
    if (id) {
      getEvents(id).then((res: DanceEvent[]) => {
        const find = res.find(e => e._id === id);
        find && setEvent(find);
      });
    }
  }, [id]);

  useEffect(() => {
    refresh()
  }, [refresh]);

  return [event, refresh];
}
