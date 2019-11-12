// @flow

import React, { useEffect } from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import { getQueryParams, navigate } from "hookrouter";
import useQrCodeScanner from "./useQrCodeScanner";
import { go } from "../../../utils/default/url";
import useTicketsToApprovePay from "../../../hooks/useTicketsToApprovePay";
import useUserToken from "../../../hooks/useUserToken";
import useCheckRole from "../../../hooks/useCheckRole";

type P = {
  selected: EpicViewId
};

const roles = ["admin", "editor", "reception"];

export const AppTabbar = (p: P) => {
  const openQrScanner = useQrCodeScanner(),
    params = getQueryParams(),
    isViewSetting = useCheckRole(roles),
    token = useUserToken(false);
  const [altPayTickets, refresh] = useTicketsToApprovePay(token);

  useEffect(() => {
    if (isViewSetting) {
      const timer = setInterval(refresh, 10000);
      return () => clearInterval(timer);
    }
  }, [isViewSetting, refresh]);

  const isExistQrCodeScanner =
    params &&
    params.vk_platform &&
    (params.vk_platform === "mobile_android" ||
      params.vk_platform === "mobile_iphone");

  if (isViewSetting) {
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
        <TabbarItem
          selected={p.selected === "menu"}
          onClick={() => go("/menu/settings")}
          label={
            altPayTickets && altPayTickets.length > 0
              ? altPayTickets.length + ""
              : undefined
          }
          text="Настройки"
        >
          <i className="fas fa-bars fa-2x" />
        </TabbarItem>
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
