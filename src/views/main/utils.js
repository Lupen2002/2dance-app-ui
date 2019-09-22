// @flow

const validMainViewId = ['main', 'ticket', 'second-user'];

export function extractMainViewId(src?: string) {
  return validMainViewId.find(row => row === src) || 'main'
}