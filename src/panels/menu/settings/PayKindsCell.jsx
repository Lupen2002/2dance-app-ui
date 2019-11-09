// @flow

import React from "react";
import useCheckRole from "../../../hooks/useCheckRole";
import { go } from "../../../utils/default/url";
import { Cell } from "@vkontakte/vkui";

type P = {};

export default function PayKindsCell(p: P) {
  const isAccess = useCheckRole("admin");

  return (
    <>
      {isAccess && (
        <Cell expandable onClick={() => go("/menu/pay-kinds")}>
          Виды оплаты
        </Cell>
      )}
    </>
  );
}
