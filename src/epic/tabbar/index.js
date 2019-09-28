// @flow

import React from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import Icon28Document from "@vkontakte/icons/dist/28/document";
import Icon28Menu from "@vkontakte/icons/dist/28/menu";
import useStartParams from "../../hooks/useStartParams";
import { getQueryParams, navigate } from "hookrouter";

type P = {
  selected: EpicViewId
};

export const AppTabbar = (p: P) => {
  const params = useStartParams(),
    query = getQueryParams();

  if (params.vk_viewer_group_role && params.vk_viewer_group_role === "admin") {
    return (
      <Tabbar>
        <TabbarItem
          selected={p.selected === "events"}
          onClick={() => navigate("/events", false, query)}
          text="Вечеринки"
        >
          <i className="fab fa-itunes-note fa-2x" />
        </TabbarItem>
        <TabbarItem
          selected={p.selected === "main"}
          onClick={() => navigate("/main", false, query)}
          text="Билет"
        >
          <i className="fas fa-ticket-alt fa-2x" />
        </TabbarItem>
        <TabbarItem
          selected={p.selected === "menu"}
          onClick={() => navigate("/menu", false, query)}
          text="Меню"
        >
          <i className="fas fa-bars fa-2x" />
        </TabbarItem>
      </Tabbar>
    );
  } else {
    return <></>;
  }
};
