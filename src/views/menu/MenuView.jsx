// @flow

import React, { useState } from "react";
import { Group, View } from "@vkontakte/vkui";
import { Cell, List, Panel, PanelHeader } from "@vkontakte/vkui";
import { extractMenuViewId } from "./utils";
import { YandexReceiverPanel } from "../../panels/menu/yandex/YandeMoneyReceiverPanel";
import { SettingsPanel } from "../../panels/menu/settings/SettingsPanel";
import { AddEventPanel } from "../../panels/menu/add-event/AddEventPanel";
import CheckTicketPanel from "../../panels/menu/check-ticket/CheckTicketPanel";
import { go } from "../../utils/default/url";
import CheckAltPayPanel from "../../panels/menu/check-alt-pay/CheckAltPayPanel";
import PayKindsPanel from "../../panels/menu/pay-kinds/PayKindsPanel";
import UsersRolesPanel from "../../panels/menu/users-roles/UserRolesPanel";

type P = {
  id: EpicViewId,
  panelId?: string
};

export const MenuView = (p: P) => {
  const panelId = extractMenuViewId(p.panelId);

  const [modal, setModal] = useState(null),
    [popout, setPopout] = useState(null);

  return (
    <View id={p.id} activePanel={panelId} modal={modal} popout={popout}>
      <Panel id="menu">
        <PanelHeader>Меню</PanelHeader>
        <Group title="Administrator">
          <List>
            <Cell expandable onClick={() => go("/menu/settings")}>
              Настройки
            </Cell>
          </List>
        </Group>
      </Panel>
      <SettingsPanel id="settings" />
      <YandexReceiverPanel id="yandex-money-receiver" />
      <AddEventPanel id="add-event" />
      <CheckTicketPanel id="check-ticket" />
      <CheckAltPayPanel id="check-alt-pay" />
      <PayKindsPanel id="pay-kinds" />
      <UsersRolesPanel
        id="users-roles"
        setModal={setModal}
        setPopout={setPopout}
      />
    </View>
  );
};
