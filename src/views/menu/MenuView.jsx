// @flow

import React, { useState }                from "react";
import { Group, View }                    from "@vkontakte/vkui";
import { Cell, List, Panel, PanelHeader } from "@vkontakte/vkui";
import useQrCodeScanner                   from "../../epic/group/tabbar/useQrCodeScanner";
import { getQueryParams, navigate }       from "hookrouter";
import { extractMenuViewId }              from "./utils";
import LeftPanelHeaderButtons             from "../../components/controlls/LeftPanelHeaderButtons";
import FormLayout                         from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input                              from "@vkontakte/vkui/dist/components/Input/Input";
import Button                             from "@vkontakte/vkui/dist/components/Button/Button";
import { YandexReceiverPanel }            from "../../panels/menu/yandex/YandeMoneyReceiverPanel";
import { SettingsPanel }    from "../../panels/menu/settings/SettingsPanel";
import { AddEventPanel }    from "../../panels/menu/add-event/AddEventPanel";
import useStartParams       from "../../hooks/useStartParams";
import CheckTicketPanel     from "../../panels/menu/check-ticket/CheckTicketPanel";
import { go }               from "../../utils/default/url";
import CheckAltPayPanel     from "../../panels/menu/check-alt-pay/CheckAltPayPanel";
import useUserToken         from "../../hooks/useUserToken";
import useAllowSendMessages from "../../hooks/useAllowSendMessages";
import PayKindsPanel        from "../../panels/menu/pay-kinds/PayKindsPanel";
import UsersRolesPanel      from "../../panels/menu/users-roles/UserRolesPanel";

type P = {
  id: EpicViewId,
  panelId?: string
};

export const MenuView = (p: P) => {
  const params = getQueryParams();
  const panelId = extractMenuViewId(p.panelId);

  const [modal, setModal] = useState(null),
        [popout, setPopout] = useState(null);

  return (
    <View id={p.id} activePanel={panelId} modal={modal} popout={popout}>
      <Panel id="menu">
        <PanelHeader>Меню</PanelHeader>
        {params && params.vk_viewer_group_role === "admin" && (
          <Group title="Administrator">
            <List>
              <Cell
                expandable
                onClick={() => go("/menu/settings")}
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
      <CheckAltPayPanel id='check-alt-pay' />
      <PayKindsPanel id='pay-kinds' />
      <UsersRolesPanel id='users-roles' setModal={setModal} setPopout={setPopout}/>
    </View>
  );
};
