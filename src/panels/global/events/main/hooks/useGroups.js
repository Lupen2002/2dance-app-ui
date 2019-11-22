// @flow

import { useEffect, useState, useMemo } from "react";
import { getGroups }                    from "../../../../../api";
import { LocalstorageCache }            from "../../../../../utils/cache/localstorage-cache";

const cache = new LocalstorageCache('groups');

export default function useGroups(cityId: number | void) {
  const [srcGroups, setScrGroups] = useState<VkGroup[] | null>(null),
        [groups, setGroups] = useState<VkGroup[] | null>(null),
    [fetching, setFetching] = useState(false);

  const refresh = useMemo(
    () => async () => {
      const groupsCache = cache.get();
      if (groupsCache) {
        setScrGroups(groupsCache);
      } else {
        setFetching(true);
      }
      try {
        const res = await getGroups();
        setScrGroups(res);
        cache.put(res);
      } catch (e) {
        console.error(e);
      }
      setFetching(false);
    },
    []
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    try {
      if (srcGroups) {
        const now = Math.round(Date.now() / 1000 - 3 * 60 * 60);
        const filtered = srcGroups.filter(
          (g: VkGroup) =>
            g.app.status === "show" &&
            g.start_date &&
            typeof g.start_date === "number" &&
            g.start_date > now &&
            (!cityId || (g.city && g.city.id === cityId))
        );
        filtered.sort((a, b) => a.start_date - b.start_date);
        setGroups(filtered);
      }
    } catch (e) {
      console.error(e);
    }
  }, [cityId, srcGroups]);

  return [groups, fetching, refresh];
}
