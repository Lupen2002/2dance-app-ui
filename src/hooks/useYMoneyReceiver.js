//@ flow

import { useState, useEffect }                 from "react";
import { getConfigs, postConfigs, putConfigs } from "../api";
import { getQueryParams }                      from "hookrouter";

type FunType = {
  config: TwoDanceConfigs,
  update: TwoDanceConfigs => void
}

export default function useYMoneyReceiver(): FunType {
  const [config, setConfig] = useState(null),
    params = getQueryParams();

  const get = async () => {
    const configs: TwoDanceConfigs[] = await getConfigs();
    const found = configs.find(
      (c: TwoDanceConfigs) => c.vkGroupId === parseInt(params.vk_group_id)
    );
    if (found) {
      setConfig(found);
    } else if (params && params.vk_group_id) {
      const found = postConfigs({
        vkGroupId: parseInt(params.vk_group_id)
      }).find((c: TwoDanceConfigs) => c.vkGroupId === parseInt(params.vk_group_id));
      setConfig(found);
    }
  };

  useEffect(() => {
    get().catch(console.error);
  }, []);

  const update = (newConfig: TwoDanceConfigs) => {
    putConfigs({ ...newConfig }).then((configs: TwoDanceConfigs[]) => {
      const found = configs.find(
        (c: TwoDanceConfigs) => c.vkGroupId === parseInt(params.vk_group_id)
      );
      found && setConfig(found);
    });
  };

  return { config, update };
}
