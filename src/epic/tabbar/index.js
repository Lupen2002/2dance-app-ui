// @flow

import React from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import { getQueryParams, navigate } from "hookrouter";
import useQrCodeScanner from "./useQrCodeScanner";
import { go } from "../../utils/default/url";

type P = {
  selected: EpicViewId
};

export const AppTabbar = (p: P) => {
  const openQrScanner = useQrCodeScanner(),
    params = getQueryParams();

  const isExistQrCodeScanner =
    params &&
    params.vk_platform &&
    (params.vk_platform === "mobile_android" ||
      params.vk_platform === "mobile_iphone");

  if (
    params.vk_viewer_group_role &&
    (params.vk_viewer_group_role === "admin" ||
      params.vk_viewer_group_role === "moder" ||
      params.vk_viewer_group_role === "editor")
  ) {
    return (
      <Tabbar>
        <TabbarItem
          selected={p.selected === "events"}
          onClick={() => go("/events")}
          text="События"
        >
          <i className="fab fa-itunes-note fa-2x" />
        </TabbarItem>
        <TabbarItem
          selected={p.selected === "main"}
          onClick={() => go("/main")}
          text="Билет"
        >
          <i className="fas fa-ticket-alt fa-2x" />
        </TabbarItem>
        {isExistQrCodeScanner && (
          <TabbarItem onClick={() => openQrScanner()} text="Сканировать">
            <i className="fas fa-camera fa-2x" />
          </TabbarItem>
        )}
        {params.vk_viewer_group_role === "admin" && (
          <TabbarItem
            selected={p.selected === "menu"}
            onClick={() => go("/menu/settings")}
            text="Настройки"
          >
            <i className="fas fa-bars fa-2x" />
          </TabbarItem>
        )}
      </Tabbar>
    );
  } else {
    return (
      <>
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
        </Tabbar>
      </>
    );
  }
};
