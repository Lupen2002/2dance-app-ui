// @flow
import React            from "react";
import usePrice         from "../../../hooks/usePrice";

type P = {
  event: DanceEvent,
  type: TicketType
};

export default function EventPrice(p: P) {
  const price = usePrice(p.event, p.type);
  return (
    <>
      <div>Цена: {price} ₽</div>
    </>
  );
}
