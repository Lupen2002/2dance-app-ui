// @flow

declare type TicketType = "single-pass" | "double-pass" | "group-pass";

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
  extra?: any,
  altPay?: {
    createdAt: number,
    comment: string,
    approve: boolean
  }
|};

declare type TwoDanceConfigs = {
  _id: string,
  vkGroupId: number,
  yMoneyReceiver: string,
  singlePassPrice: number,
  doublePassPrice: number
};

declare type EventPrice = {|
  date: string,
  timestamp: number,
  time: string,
  singlePrice: number,
  doublePrice: number
|};

declare type DanceEvent = {|
  _id: string,
  vkGroupId: number,
  timestamp: number,
  label: string,
  prices?: EventPrice[],
  singlePrice: number,
  doublePrice: number,
  rePostControl?: boolean,
  rePostDiscount?: number,
  postUrl?: string
|};

declare type VKUser = {
  id: number,
  first_name: string,
  last_name: string,
  sex: number,
  photo_100: string
};

declare type User = {|
  _id: string,
  vkId: number,
  vkUser: VKUser,
  role: "root" | "admin" | "user"
|};
