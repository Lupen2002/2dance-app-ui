// @flow

import React from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import Icon28Document from "@vkontakte/icons/dist/28/document";
import Icon28Camera from "@vkontakte/icons/dist/28/camera";
import Icon28Menu from '@vkontakte/icons/dist/28/menu';
import useStartParams from "../../hooks/useStartParams";
import { getQueryParams, navigate } from "hookrouter";
import useQrCodeScanner from "./useQrCodeScanner";

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
          selected={p.selected === "main"}
          onClick={() => navigate("/main", false, query)}
          text="Билет"
        >
          <Icon28Document />
        </TabbarItem>
        <TabbarItem
          selected={p.selected === "menu"}
          onClick={() => navigate("/menu", false, query)}
          text="Меню"
        >
          <Icon28Menu />
        </TabbarItem>
      </Tabbar>
    );
  } else {
    return <></>;
  }
};
