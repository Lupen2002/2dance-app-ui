// @flow

const validEpicViewIds: EpicViewId[] = ['main', 'menu', 'events', 'check-params'];

export function extractEpicViewId(src: ?string):EpicViewId {
  return validEpicViewIds.find(id => id === src) || 'main'
}