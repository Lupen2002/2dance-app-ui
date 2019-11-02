//@ flow

import { useMemo, useState, useEffect } from "react";
import { getConfigs, postConfigs, putConfigs } from "../api";
import { getQueryParams } from "hookrouter";

type Result = [
  ?TwoDanceConfigs,
  (TwoDanceConfigs) => Promise<void>,
  () => Promise<void>
];

export default function useConfigs(): Result {
  const [config, setConfig] = useState(null),
        [fetching, setFetching] = useState(false);

  const refresh = useMemo(
    () => async () => {
      setFetching(true);

      const params = getQueryParams(),
        vk_group_id = parseInt(params.vk_group_id);
      const configs: TwoDanceConfigs[] = await getConfigs();
      const found = configs.find(c => c.vkGroupId === vk_group_id);
      if (found) {
        setConfig(found);
      } else if (params && params.vk_group_id) {
        const found = postConfigs({
          vkGroupId: vk_group_id
        }).find(c => c.vkGroupId === vk_group_id);
        setConfig(found);
      }
      setFetching(false)
    },
    [setConfig, setFetching]
  );

  const update = useMemo(
    () => async (newConfig: TwoDanceConfigs) => {
      await putConfigs({ ...newConfig });
      await refresh();
    },
    [refresh]
  );

  useEffect(() => {
    if (config && !config.payKinds) {
      const payKinds: PayKind[] = [
        {name: 'vk-pay'},
        {name: 'yandex-money'},
        {name: 'alt-pay'},
      ];
      update({...config, payKinds})
    }
  }, [config, update]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return [config, update, refresh, fetching];
}
