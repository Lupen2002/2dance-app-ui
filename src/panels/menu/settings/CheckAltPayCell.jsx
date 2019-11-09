// @flow

import React from "react";
import useCheckRole from "../../../hooks/useCheckRole";
import { go } from "../../../utils/default/url";
import { Cell, Counter } from "@vkontakte/vkui";
import useTicketsToApprovePay from "../../../hooks/useTicketsToApprovePay";
import useUserToken from "../../../hooks/useUserToken";

type P = {};

export default function CheckAltPayCell(p: P) {
  const isAccess = useCheckRole("admin", "reception");
  const token = useUserToken(true),
    [altPayTickets] = useTicketsToApprovePay(token);

  return (
    <>
      {isAccess && (
        <Cell
          expandable
          onClick={() => go("/menu/check-alt-pay")}
          indicator={altPayTickets && <Counter>{altPayTickets.length}</Counter>}
        >
          Подтверждение оплаты
        </Cell>
      )}
    </>
  );
}
