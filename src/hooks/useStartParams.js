// @flow

import { useMemo }        from "react";
import { getQueryParams } from "hookrouter";

export default function useStartParams(): StartParams {
  return useMemo(getQueryParams, []);
}
