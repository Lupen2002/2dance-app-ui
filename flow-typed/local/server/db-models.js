// @flow

declare type TicketType = 'single-pass' | 'double-pass' | 'group-pass';

declare type Ticket = {
  _id: string,
  vkUserId: number,
  ticketType: TicketType,
  toDate: string,
  transactionId: string
}