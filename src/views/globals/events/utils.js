// @flow

const validEventsViewId = ['main'];

export function extractMainViewId(src?: string) {
  return validEventsViewId.find(row => row === src) || 'main'
}
