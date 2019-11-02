// @flow

import React from "react";

type P = {
  event: DanceEvent,
  user: VKUser
};

export default function YandexMoneyTargetInput(p: P) {
  return (
    <input
      type="hidden"
      name="targets"
      value={`${p.event.label}, ${new Date(
        p.event.timestamp
      ).toLocaleString()}, ${p.user.last_name} ${p.user.first_name}`}
    />
  );
}
