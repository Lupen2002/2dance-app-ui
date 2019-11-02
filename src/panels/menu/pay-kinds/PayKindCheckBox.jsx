// @flow

import React, { useMemo } from "react";
import { Avatar, Cell } from "@vkontakte/vkui";

type P = {
  pay: PayKind,
  onChange: PayKind => any
};

export default function PayKindCheckBox(p: P) {
  const [icon, label] = useMemo(() => {
    switch (p.pay.name) {
      case "vk-pay":
        return ["fab fa-vk", "VkPay"];
      case "yandex-money":
        return ["fab fa-yandex-international", "Яндекс Деньги + Оплата картой"];
      default:
        return ["fas fa-money-bill-wave-alt", "Наличными"];
    }
  }, [p]);

  return (
    <Cell
      onChange={e => p.onChange({...p.pay, on: e.target.checked})}
      checked={p.pay.on}
      selectable
      before={
        <Avatar size={36}>
          <i className={icon} />
        </Avatar>
      }
    >
      {label}
    </Cell>
  );
}
