// @flow

import React, { useState }    from "react";
import { Panel, PanelHeader } from "@vkontakte/vkui";
import LeftPanelHeaderButtons from "../../../components/controlls/LeftPanelHeaderButtons";
import { navigate }           from "hookrouter";
import FormLayout             from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Input                  from "@vkontakte/vkui/dist/components/Input/Input";
import Button                 from "@vkontakte/vkui/dist/components/Button/Button";
import useYMoneyReceiver      from "../../../hooks/useYMoneyReceiver";

type P = {
  id: MenuViewId
};

const pattern = /^\d{15}$/;

export const YandexReceiverPanel = (p: P) => {
  const [yMoneyReceiver, setYmReceiver] = useState(null);
  const [ config, update ] = useYMoneyReceiver();

  return (
    <Panel id={p.id}>
      <PanelHeader
        left={
          <LeftPanelHeaderButtons
            type="cancel"
            back={() => navigate("/menu/settings")}
          />
        }
      >
        Яндек Кошелек
      </PanelHeader>
      {config && (
        <FormLayout>
          <Input
            type="text"
            top="Номер яндекс кошелька"
            name="ym-receiver"
            value={yMoneyReceiver||config.yMoneyReceiver}
            onChange={e => setYmReceiver(e.currentTarget.value)}
            status={pattern.test(yMoneyReceiver||config.yMoneyReceiver) ? "valid" : "error"}
          />
          <Button disabled={!pattern.test(yMoneyReceiver||config.yMoneyReceiver)} size="xl" onClick={() => update({...config, yMoneyReceiver})}>
            Сохранить
          </Button>
        </FormLayout>
      )}
    </Panel>
  );
};
