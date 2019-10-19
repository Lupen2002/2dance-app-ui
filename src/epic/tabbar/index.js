// @flow

import React from "react";
import { Cell, Tabbar, TabbarItem } from "@vkontakte/vkui";
import Icon28Document from "@vkontakte/icons/dist/28/document";
import Icon28Menu from "@vkontakte/icons/dist/28/menu";
import { getQueryParams, navigate } from "hookrouter";
import useQrCodeScanner from "./useQrCodeScanner";

type P = {
  selected: EpicViewId
};

export const AppTabbar = (p: P) => {
  const openQrScanner = useQrCodeScanner(),
    params = getQueryParams();

  const isExistQrCodeScanner =
    params &&
    params.vk_viewer_group_role === "admin" &&
    params.vk_platform &&
    (params.vk_platform === "mobile_android" ||
      params.vk_platform === "mobile_iphone");

  if (params.vk_viewer_group_role && params.vk_viewer_group_role === "admin") {
    return (
      <Tabbar>
        <TabbarItem
          selected={p.selected === "events"}
          onClick={() => navigate("/events", false, getQueryParams())}
          text="События"
        >
          <i className="fab fa-itunes-note fa-2x" />
        </TabbarItem>
        <TabbarItem
          selected={p.selected === "main"}
          onClick={() => navigate("/main", false, getQueryParams())}
          text="Билет"
        >
          <i className="fas fa-ticket-alt fa-2x" />
        </TabbarItem>
        {isExistQrCodeScanner && (
          <TabbarItem onClick={() => openQrScanner()} text="Сканировать">
            <i className="fas fa-camera fa-2x" />
          </TabbarItem>
        )}
        <TabbarItem
          selected={p.selected === "menu"}
          onClick={() => navigate("/menu", false, getQueryParams())}
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
