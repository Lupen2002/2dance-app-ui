//@ flow

import { useState, useEffect } from "react";
import { getConfigs, postConfigs, putConfigs } from "../../../api";
import { getQueryParams } from "hookrouter";

export default function useYMoneyReceiver() {
  const [config, setConfig] = useState(null),
    params = getQueryParams();

  const get = async () => {
    const configs: Configs[] = await getConfigs();
    const found = configs.find(
      (c: Configs) => c.vkGroupId === parseInt(params.vk_group_id)
    );
    if (found) {
      setConfig(found);
    } else if (params && params.vk_group_id) {
      const found = postConfigs({
        vkGroupId: parseInt(params.vk_group_id)
      }).find((c: Configs) => c.vkGroupId === parseInt(params.vk_group_id));
      setConfig(found);
    }
  };

  useEffect(() => {
    get().catch(console.error);
  }, []);

  const update = (newConfig: Configs) => {
    putConfigs({ ...newConfig }).then((configs: Configs[]) => {
      const found = configs.find(
        (c: Configs) => c.vkGroupId === parseInt(params.vk_group_id)
      );
      found && setConfig(found);
    });
  };

  return { config, update };
}
