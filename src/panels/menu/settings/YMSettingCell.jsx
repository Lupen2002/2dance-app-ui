// @flow

import React, { useMemo } from "react";
import { Cell } from "@vkontakte/vkui";
import { go } from "../../../utils/default/url";
import useCheckRole from "../../../hooks/useCheckRole";

export default function YmSettingCell() {
  const isAccess = useCheckRole("admin");
  const ymSetting = useMemo(() => () => go("/menu/yandex-money-receiver"), []);

  return (
    <>
      {isAccess && (
        <Cell expandable onClick={ymSetting}>
          Яндекс.Кошелёк
        </Cell>
      )}
    </>
  );
}
