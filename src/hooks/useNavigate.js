// @flow
import {useMemo} from 'react';
import { navigate, useQueryParams } from "hookrouter";

export default function useNavigate() {
  const [params, setParams] = useQueryParams();

  const go = useMemo(() => (uri: string) => {
    navigate(uri, false, params);
  }, [params]);

  const addParams = useMemo( () => (key: string, value: any) => {
    setParams({...params, [key]: value})
  }, [params, setParams]);

  return [go, params, addParams, setParams]
}
