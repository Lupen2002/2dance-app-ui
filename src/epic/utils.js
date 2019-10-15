// @flow

const validEpicViewIds: EpicViewId[] = ['main', 'menu', 'events'];

export function extractEpicViewId(src: ?string):EpicViewId {
  return validEpicViewIds.find(id => id === src) || 'events'
}