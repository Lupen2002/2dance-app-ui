// @flow

import React, { useState } from "react";
import { Group, View } from "@vkontakte/vkui";
import { Cell, List, Panel, PanelHeader } from "@vkontakte/vkui";
import useQrCodeScanner from "../../epic/tabbar/useQrCodeScanner";
import { getQueryParams, navigate } from "hookrouter";
import { extractMenuViewId } from "./utils";
import LeftPanelHeaderButtons from "../../components/controlls/LeftPanelHeaderButtons";
import FormLayout              from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input                   from "@vkontakte/vkui/dist/components/Input/Input";
import Button                  from "@vkontakte/vkui/dist/components/Button/Button";
import { YandexReceiverPanel } from "../../panels/menu/yandex/YandeMoneyReceiverPanel";
import { SettingsPanel }       from "../../panels/menu/settings/SettingsPanel";
import { AddEventPanel }       from "../../panels/menu/add-event/AddEventPanel";
import useStartParams          from "../../hooks/useStartParams";
import CheckTicketPanel        from "../../panels/menu/check-ticket/CheckTicketPanel";

type P = {
  id: EpicViewId,
  panelId?: string
};

export const MenuView = (p: P) => {
  const openQrScanner = useQrCodeScanner(),
    params = useStartParams();

  const isExistQrCodeScanner =
    params.vk_platform &&
    (params.vk_platform === "mobile_android" ||
      params.vk_platform === "mobile_iphone");

  const panelId = extractMenuViewId(p.panelId);

  return (
    <View id={p.id} activePanel={panelId}>
      <Panel id="menu">
        <PanelHeader>Меню</PanelHeader>
        {params && params.vk_viewer_group_role === "admin" && (
          <Group title="Administrator">
            <List>
              <Cell
                expandable
                onClick={() => navigate("/menu/settings", false, params)}
              >
                Настройки
              </Cell>
            </List>
          </Group>
        )}
      </Panel>
      <SettingsPanel id="settings" />
      <YandexReceiverPanel id="yandex-money-receiver" />
      <AddEventPanel id="add-event" />
      <CheckTicketPanel id='check-ticket'/>
    </View>
  );
};
