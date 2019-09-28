// @flow

const validEpicViewIds: EpicViewId[] = ['main', 'menu'];

export function extractEpicViewId(src: ?string):EpicViewId {
  return validEpicViewIds.find(id => id === src) || 'main'
}