// @flow

import React, { useState } from "react";
import { Group, View } from "@vkontakte/vkui";
import { Cell, List, Panel, PanelHeader } from "@vkontakte/vkui";
import useQrCodeScanner from "../../epic/tabbar/useQrCodeScanner";
import { getQueryParams, navigate } from "hookrouter";
import { extractMenuViewId } from "./utils";
import LeftPanelHeaderButtons from "../../components/controlls/LeftPanelHeaderButtons";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import { YandexReceiverPanel } from "../../panels/menu/yandex/YandeMoneyReceiverPanel";
import { SettingsPanel } from "../../panels/menu/settings/SettingsPanel";

type P = {
  id: EpicViewId,
  panelId?: string
};

export const MenuView = (p: P) => {
  const openQrScanner = useQrCodeScanner(),
    params = getQueryParams();

  const isExistQrCodeScanner =
    params.vk_platform &&
    (params.vk_platform === "mobile_android" ||
      params.vk_platform === "mobile_iphone");

  const panelId = extractMenuViewId(p.panelId);

  return (
    <View id={p.id} activePanel={panelId}>
      <Panel id="menu">
        <PanelHeader>Меню</PanelHeader>
        <Group>
          <List>
            {isExistQrCodeScanner && (
              <Cell expandable onClick={() => openQrScanner()}>
                Сканировать
              </Cell>
            )}
            <Cell
              expandable
              onClick={() => navigate("/menu/settings", false, params)}
            >
              Настройки
            </Cell>
          </List>
        </Group>
      </Panel>
      <SettingsPanel id="settings" />
      <YandexReceiverPanel id="yandex-money-receiver" />
    </View>
  );
};