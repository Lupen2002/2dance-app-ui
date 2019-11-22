// @flow

import React from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import useNavigate from "../../../hooks/useNavigate";
import useUserToken from "../../../hooks/useUserToken";
import useUserById from "../../../hooks/useUserById";

type P = {};
const roles = ["root"];

export const AppTabbar = (p: P) => {
  const [go, params] = useNavigate(),
    token = useUserToken();
  const [user] = useUserById(parseInt(params.vk_user_id), token);

  return (
    <>
      {user && user.vkId === 10640580 && (
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
      )}
    </>
  );
};
