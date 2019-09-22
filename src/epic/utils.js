// @flow

const validEpicViewIds: EpicViewId[] = ['main', 'scanner'];

export function extractEpicViewId(src: ?string):EpicViewId {
  return validEpicViewIds.find(id => id === src) || 'main'
}