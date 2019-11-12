// @flow

import { navigate, useQueryParams } from "hookrouter";

export default function useNavigate() {
  const [params, setParams] = useQueryParams();

  const go = (uri: string) => {
    navigate(uri, false, params);
  };

  return [go, params, setParams]
}
