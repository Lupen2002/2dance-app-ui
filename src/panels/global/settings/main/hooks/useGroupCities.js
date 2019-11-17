// @flow
import { useState, useEffect } from "react";
import useGroups from "../../../events/main/hooks/useGroups";

export default function useGroupCities() {
  const [groups: VkGroup[] | null, fetching, update] = useGroups(),
    [cities, setCities] = useState(null);

  useEffect(() => {
    if (groups) {
      const citiesSearch = [];
      for (let g of groups) {
        const c = g.city;
        if (c) {
          const i = citiesSearch.findIndex(cs => cs.id === c.id);
          if (i > -1) {
            citiesSearch[i].count += 1;
          } else {
            citiesSearch.push({...c, count: 1});
          }
        }
      }
      citiesSearch.sort((cs1, cs2) => cs2.count - cs1.count);
      setCities(citiesSearch);
    }
  }, [groups]);

  return [cities, fetching, update];
}
