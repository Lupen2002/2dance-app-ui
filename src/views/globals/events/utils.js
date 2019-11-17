// @flow

const validEventsViewId = ['main', 'by-city'];

export function extractMainViewId(src?: string) {
  return validEventsViewId.find(row => row === src) || 'main'
}
