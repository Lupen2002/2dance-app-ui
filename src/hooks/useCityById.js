// @flow

import {useState, useMemo, useEffect} from 'react'
import useUserToken                   from "./useUserToken";
import { getCitiesById }              from "../api/vk/api";
import type { GetCitiesByIdRes }     from "../api/vk/api";

export default function useCityById(id: ?number) {
  const [city, setCity] = useState<VKCityType|null>(null),
        token = useUserToken();

  const refresh = useMemo( () => async () => {
    if (id && token) {
      const res: GetCitiesByIdRes = await getCitiesById(id, token);
      if (res.data.response.length > 0) {
        setCity(res.data.response[0])
      }
    }
  },[id, token]);

  useEffect(() => {
    refresh()
  }, [refresh]);

  return [city, refresh]
}

