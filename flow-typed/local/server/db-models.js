// @flow

declare type TicketType = 'single-pass' | 'double-pass' | 'group-pass';

declare type Ticket = {
  _id: string,
  vkUserId: number,
  secondUserId?: number,
  groupId: number,
  ticketType: TicketType,
  toDate: string,
  transactionId: string
}

declare type Configs = {
  _id: string,
  vkGroupId: number,
  yMoneyReceiver: string,
  singlePassPrice: number,
  doublePassPrice: number
}