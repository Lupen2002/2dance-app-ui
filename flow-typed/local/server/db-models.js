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

declare type PayKind = {
  name: string,
  on?: boolean
};

declare type UserRoleGroup = {
  vkUserId: number,
  role: "admin" | "reception" | "editor"
};

declare type TwoDanceConfigs = {|
  _id: string,
  vkGroupId: number,
  yMoneyReceiver: string,
  payKinds?: PayKind[],
  roles?: UserRoleGroup[]
|};

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
  postUrl?: string,
  avatar?: string
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
  allowMessages?: boolean,
  client_info?: {
    button_actions: ("text" | "vkpay" | "open_app" | "location")[],
    keyboard: boolean,
    lang_id: number
  },
  vk_token?: string,
  role: "root" | "admin" | "user"
|};

declare type VkGroupContact = {
  user_id: number, // — идентификатор пользователя;
  desc: string, // — должность;
  phone: string, // — номер телефона;
  email: string // — адрес e-mail.
};

declare type VkGroup = {
  _id: string,
  id: number,
  name: string,
  app: {
    status: 'new' | 'ignored' | 'show'
  },
  type: "group" | "page" | "event",
  photo_50: string,
  photo_100: string,
  photo_200: string,
  activity?: string,
  city: {
    id: number,
    title: string
  },
  contacts?: VkGroupContact[],
  country?: {
    id: number,
    title: string
  },
  description?: string,
  public_date_label?: string,
  start_date?: number | string,
  finish_date?: number | string
};
