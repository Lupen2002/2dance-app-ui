// @flow

const validMainViewId:MenuViewId[] = ['menu', 'settings', 'yandex-money-receiver'];

export function extractMenuViewId(src?: string): MenuViewId {
  return validMainViewId.find(row => row === src) || 'menu'
}