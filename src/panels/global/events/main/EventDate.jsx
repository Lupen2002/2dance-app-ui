// @flow

import React, { useMemo } from "react";
import Moment from "react-moment";

type P = {
  date: void | number | string
};

export default function EventDate(p: P) {
  const date = useMemo(
    () => (typeof p.date === "number" ? p.date * 1000 : p.date),
    [p.date]
  );

  return <Moment format="DD.MM.YYYY HH:mm" date={date} />;
}
