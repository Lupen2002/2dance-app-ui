// @flow

import React        from 'react'
import CountTickets from "./CountTickets";

type P = {
  event: DanceEvent
}

export default function EventCellDescription(p: P) {
  return (
    <>
      {new Date(p.event.timestamp).toLocaleString()}
      <br />
      <CountTickets event={p.event} />
    </>
  )
}