// @flow

import {useState, useMemo, useEffect} from 'react'
import { getUsers }                   from "../api";

export default function useUsers() {
  const [users, setUsers] = useState<?(number[])>(null),
        [fetching, setFetching] = useState(false);

  const refresh = useMemo(() => async () => {
    setFetching(true);
    const users: number[] = await getUsers();
    setUsers(users);
    setFetching(false);
  }, []);

  useEffect(() => {
    refresh()
  }, [refresh]);

  return [users, refresh, fetching]
}
