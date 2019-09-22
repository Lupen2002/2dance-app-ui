// @flow

import { useSelector } from "react-redux";

export default function useStartParams(): StartParams {
  return useSelector<AppState, StartParams>(state => state.startParams)
}
