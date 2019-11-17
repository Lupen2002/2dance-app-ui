// @flow

import React                  from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import useNavigate            from "../../../hooks/useNavigate";

type P = {};

export const AppTabbar = (p: P) => {
  const [go] = useNavigate();

  return (
    <Tabbar>
      <TabbarItem onClick={() => go("/global-events")} text="События">
        <i className="fas fa-calendar fa-2x" />
      </TabbarItem>
      {/*<TabbarItem onClick={() => go("/global-favorite")} text="Избранное">
        <i className="fas fa-star fa-2x" />
      </TabbarItem>*/}
      <TabbarItem onClick={() => go("/global-settings")} text="Настройки">
        <i className="fas fa-bars fa-2x" />
      </TabbarItem>
    </Tabbar>
  );
};
