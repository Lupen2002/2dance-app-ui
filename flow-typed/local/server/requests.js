// @flow

declare type NotifyRequest = {
  receiverUserId: number,
  payload: {
    type: 'new-ticket',
    ticketId: string
  }
}