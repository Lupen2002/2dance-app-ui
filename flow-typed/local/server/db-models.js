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