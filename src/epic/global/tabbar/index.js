// @flow

import React from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import { go } from "../../../utils/default/url";

type P = {};

export const AppTabbar = (p: P) => {
  return (
    <Tabbar>
      <TabbarItem onClick={() => go("/global-events")} text="События">
        <i className="fab fa-itunes-note fa-2x" />
      </TabbarItem>
      <TabbarItem onClick={() => go("/global-moderation")} text="Модерация">
        <i className="fas fa-bars fa-2x" />
      </TabbarItem>
    </Tabbar>
  );
};
