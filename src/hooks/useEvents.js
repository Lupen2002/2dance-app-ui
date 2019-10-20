// @flow
import {sortBy} from 'lodash'
import { useState, useEffect, useMemo } from "react";
import { getEvents } from "../api";
import { getQueryParams } from "hookrouter";

export function useEvents(all?: boolean) {
  const [events, setEvents] = useState<?(DanceEvent[])>(null);

  useEffect(() => {
    const params = getQueryParams();
    if (params && params.vk_group_id) {
      const id = parseInt(params.vk_group_id);
      const current = Date.now() - 10 * 60 * 60 * 1000;
      getEvents().then((res: DanceEvent[]) => {
        const filtered = res.filter(
          e => all || (e.vkGroupId === id && e.timestamp > current)
        );
        setEvents(sortBy(filtered, 'timestamp'));
      });
    }
  }, [all]);

  return events;
}
