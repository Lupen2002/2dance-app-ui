// @flow

import { useEffect, useMemo, useState } from "react";
import useUserToken from "./useUserToken";
import { getGroupById } from "../api/vk/groups";
import { getQueryParams } from "hookrouter";

export default function useCurrentGroup(): [?VkGroup, any, boolean] {
  const token = useUserToken(),
    [fetching, setFetching] = useState(false),
    [group, setGroup] = useState<?VkGroup>(null);

  const refresh = useMemo(
    () => async () => {
      setFetching(true);
      const params = getQueryParams();
      if (token) {
        const g = await getGroupById(params.vk_group_id, token);
        setGroup(g);
      }
      setFetching(false);
    },
    [token]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return [group, refresh, fetching];
}
