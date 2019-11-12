// @flow

const validMainViewId = ['main'];

export function extractMainViewId(src?: string) {
  return validMainViewId.find(row => row === src) || 'main'
}
