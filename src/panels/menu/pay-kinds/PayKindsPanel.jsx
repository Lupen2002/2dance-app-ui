// @flow

import React                  from "react";
import {
  Avatar,
  Group,
  Panel,
  PanelHeader,
  PanelSpinner,
  PullToRefresh
}                             from "@vkontakte/vkui";
import { List, Cell }         from "@vkontakte/vkui";
import LeftPanelHeaderButtons from "../../../components/controlls/LeftPanelHeaderButtons";
import { back }               from "../../../utils/default/url";
import useConfigs             from "../../../hooks/useConfigs";
import PayKindCheckBox        from "./PayKindCheckBox";

type P = {
  id: MenuViewId
};

export default function PayKindsPanel(p: P) {
  const [config, update, refresh, fetching] = useConfigs();

  const onChange = (i: number) => (pay: PayKind) => {
    const payKinds = [...config.payKinds];
    payKinds[i] = pay;
    update({...config, payKinds})
  };

  return (
    <Panel id={p.id}>
      <PanelHeader left={<LeftPanelHeaderButtons type="back" back={back} />}>
        Виды оплаты
      </PanelHeader>
      {(!config || !config.payKinds)&& <PanelSpinner />}
      {config && config.payKinds && (
        <PullToRefresh onRefresh={refresh} isFetching={fetching}>
          <Group>
            <List>
              {config.payKinds.map((p, i) => (
                <PayKindCheckBox key={'pay-kind-'+p.name} pay={p} onChange={onChange(i)}/>
              ))}
            </List>
          </Group>
        </PullToRefresh>
      )}
    </Panel>
  );
}
