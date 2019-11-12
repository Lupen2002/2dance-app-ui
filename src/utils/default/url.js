// @flow

import { getQueryParams, navigate } from "hookrouter";

type UrlTypeParams = {[string]: string}

export const queryStringToObject = (inStr: string): UrlTypeParams => {
  const p = new URLSearchParams(inStr);
  let result = {};
  for (let param of p) {
    result[param[0]] = param[1];
  }
  return result;
};

export const back = () => window.history.go(-1);

/**
 * @deprecated
 */
export const go = (uri: string, params: any = {}, replace: boolean = false) => {
  navigate(uri, false, params, replace);
};

export const appURL = (hash?: string) => {
  const params = getQueryParams();
  const appId = process.env.REACT_APP_ID||'';
  return 'https://vk.com/app'+appId+'_-'+params.vk_group_id + (hash ? '#'+hash : '')
};
