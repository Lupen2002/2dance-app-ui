// @flow

declare type TicketType = 'single-pass' | 'double-pass' | 'group-pass';

declare type Ticket = {
  _id: string,
  vkUserId: number,
  vkGroupId: number,
  eventId: string,
  ticketType: TicketType,
  secondUserId?: number,
  vkTransactionId?: string,
  isClose: boolean
}

declare type Configs = {
  _id: string,
  vkGroupId: number,
  yMoneyReceiver: string,
  singlePassPrice: number,
  doublePassPrice: number
}

declare type DanceEvent = {
  _id: string,
  vkGroupId: number,
  timestamp: number,
  label: string,
  start: number,
  singlePrice: number,
  doublePrice: number,
}