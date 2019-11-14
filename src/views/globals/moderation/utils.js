// @flow

const validMainViewId = ['main', 'moderation'];

export function extractMainViewId(src?: string) {
  return validMainViewId.find(row => row === src) || 'main'
}
