// @flow

const wallRegexp = /wall-(\d+)_(\d+)$/;

export const parseWallUrl = (url: string): [?number, ?number] => {
  const result = url.match(wallRegexp);
  return result ? [parseInt(result[1]), parseInt(result[2])] : [null, null]
};