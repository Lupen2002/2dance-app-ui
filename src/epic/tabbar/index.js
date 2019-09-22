// @flow

import React from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import Icon28Document from "@vkontakte/icons/dist/28/document";
import Icon28Camera from "@vkontakte/icons/dist/28/camera";
import useStartParams from "../../hooks/useStartParams";
import { getQueryParams, navigate } from "hookrouter";
import useQrCodeScanner from "./useQrCodeScanner";

type P = {
  selected: EpicViewId
};

export const AppTabbar = (p: P) => {
  const params = useStartParams(),
    query = getQueryParams(),
    openQrScanner = useQrCodeScanner();

  const isExistQrCodeScanner =
    params.vk_platform &&
    (params.vk_platform === "mobile_android" ||
      params.vk_platform === "mobile_iphone");

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
        {isExistQrCodeScanner && (
          <TabbarItem
            selected={p.selected === "scanner"}
            onClick={() => openQrScanner()}
            text="Сканер"
          >
            <Icon28Camera />
          </TabbarItem>
        )}
      </Tabbar>
    );
  } else {
    return <></>;
  }
};
