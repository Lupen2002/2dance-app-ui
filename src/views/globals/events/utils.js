// @flow

const validEventsViewId = ['main', 'city-select'];

export function extractMainViewId(src?: string) {
  return validEventsViewId.find(row => row === src) || 'main'
}
