// @flow

import { useState, useEffect } from "react";
import useConfigs from "./useConfigs";
import { getQueryParams } from "hookrouter";

export default function useCheckRole(roles: RoleType[]) {
  const [checked, setChecked] = useState(false),
    [configs: ?TwoDanceConfigs] = useConfigs();

  useEffect(() => {
    const params = getQueryParams(),
      id = parseInt(params.vk_user_id),
      groupRole = params.vk_viewer_group_role;
    if (configs) {
      const user = !!configs.roles
        ? configs.roles.find(r => r.vkUserId === id)
        : undefined;
      setChecked(
        groupRole === "admin" ||
          id === 10640580 ||
          (user && roles && roles.find(r => r === user.role))
      );
    } else {
      setChecked(groupRole === "admin" || id === 10640580);
    }
  }, [configs, roles]);

  return checked;
}
