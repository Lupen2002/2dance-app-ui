// @flow

import { getQueryParams } from "hookrouter";

/**
 * @deprecated
 */
export default function useStartParams(): StartParams {
  return getQueryParams();
}
