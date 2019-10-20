// @flow

declare type TicketType = 'single-pass' | 'double-pass' | 'group-pass';

declare type Ticket = {|
  _id: string,
  vkUserId: number,
  vkGroupId: number,
  eventId: string,
  ticketType: TicketType,
  secondUserId?: number,
  transactionId?: string,
  isClose: boolean,
  uuid?: string,
  ymAccepted?: boolean,
  ymOperationId?: string,
  amount?: number | string,
  extra?: any
|}

declare type TwoDanceConfigs = {
  _id: string,
  vkGroupId: number,
  yMoneyReceiver: string,
  singlePassPrice: number,
  doublePassPrice: number
}

declare type DanceEvent = {|
  _id: string,
  vkGroupId: number,
  timestamp: number,
  label: string,
  singlePrice: number,
  doublePrice: number,
  rePostControl?: boolean,
  postUrl?: string
|}