// @flow

const validMainViewId: MenuViewId[] = [
  "menu",
  "settings",
  "pay-kinds",
  "yandex-money-receiver",
  "add-event",
  "check-alt-pay",
  "check-ticket"
];

export function extractMenuViewId(src?: string): MenuViewId {
  return validMainViewId.find(row => row === src) || "menu";
}
