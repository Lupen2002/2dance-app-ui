// @flow

const validEpicViewIds: EpicViewId[] = ['main'];

export function extractEpicViewId(src: ?string):EpicViewId {
  return validEpicViewIds.find(id => id === src) || 'main'
}