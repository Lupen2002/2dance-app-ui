// @flow

import React, { useMemo } from "react";
import { Cell } from "@vkontakte/vkui";

type P = {
  token: string,
  user: User,
  onOpenSelect: () => void
};

export default function CityCell(p: P) {
  const city = useMemo(() => {
    return (p.user.settings && p.user.settings.globalApp.filters.city.title) || "Все";
  }, [p.user]);

  return (
    <Cell expandable indicator={city} before={<i className="fas fa-home" />} onClick={p.onOpen}>
      Город
    </Cell>
  );
}
