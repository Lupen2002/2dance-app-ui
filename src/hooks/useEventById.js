// @flow

import { useState, useMemo, useEffect } from "react";
import { getEvents } from "../api";

export function useEventById(id: ?string): [?DanceEvent, ()=>Promise<void>, boolean] {
  const [event, setEvent] = useState<?DanceEvent>(null),
        [fetching, setFetching] = useState(false);

  const refresh = useMemo(() => async () => {
    setFetching(true);
    if (id) {
      getEvents(id).then((res: DanceEvent[]) => {
        const find = res.find(e => e._id === id);
        find && setEvent(find);
      });
    }
    setFetching(false);
  }, [id]);

  useEffect(() => {
    refresh()
  }, [refresh]);

  return [event, refresh, fetching];
}
