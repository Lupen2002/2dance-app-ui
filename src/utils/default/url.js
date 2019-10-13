// @flow

type UrlTypeParams = {[string]: string}

export const queryStringToObject = (inStr: string): UrlTypeParams => {
  const p = new URLSearchParams(inStr);
  let result = {};
  for (let param of p) {
    result[param[0]] = param[1];
  }
  return result;
};