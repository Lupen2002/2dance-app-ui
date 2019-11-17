// @flow

import { useEffect, useState, useMemo } from "react";
import { getGroups } from "../../../../../api";

export default function useGroups(cityId: number | void) {
  const [groups, setGroups] = useState<VkGroup[] | null>(null),
    [fetching, setFetching] = useState(false);

  const refresh = useMemo(
    () => async () => {
      setFetching(true);
      try {
        const now = Math.round(Date.now() / 1000);
        const res = await getGroups();
        const filtered = res.filter(
          (g: VkGroup) =>
            g.app.status === "show" &&
            g.start_date &&
            typeof g.start_date === "number" &&
            g.start_date > now &&
            (!cityId || (g.city && g.city.id === cityId))
        );
        setGroups(filtered.sort((a, b) => a.start_date - b.start_date));
      } catch (e) {
        console.error(e);
      }
      setFetching(false);
    },
    [cityId]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return [groups, fetching, refresh];
}
