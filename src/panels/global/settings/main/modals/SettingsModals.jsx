// @flow

import React, { useMemo, useState, useEffect }   from "react";
import { ModalPage, ModalPageHeader, ModalRoot } from "@vkontakte/vkui";
import { getCities }                             from "../../../../../api/vk/api";

type P = {
  user: User,
  token: string,
  active: string,
  onActive: string => void
};

export default function SettingsModals(p: P) {
  const [cities, setCities] = useState(null);
  const city = useMemo(() => {
    return (
      (p.user.settings && p.user.settings.globalApp.filters.city.id) || "Все"
    );
  }, [p.user]);

  useEffect(() => {
    if (p.token) {
      getCities(p.token).then( res => {
        const data: DatabaseGetCitiesResponse = res.data;
        setCities(data.response.items)
      });
    }
  }, [p.token]);

  return (
    <>
      <ModalRoot activeModal={p.active}>
        <ModalPage id='select-city' onClose={() => p.onActive(null)}>
          <ModalPageHeader>Выберите город</ModalPageHeader>
          {JSON.stringify(cities)}
        </ModalPage>
      </ModalRoot>
    </>
  );
}
