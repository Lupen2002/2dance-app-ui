// @flow

import React, { useState }    from "react";
import {
  Panel,
  PanelHeader,
  Placeholder,
  PullToRefresh,
  Button
}                             from "@vkontakte/vkui";
import Icon56MessageReadOutline from '@vkontakte/icons/dist/56/message_read_outline'
import LeftPanelHeaderButtons from "../../../components/controlls/LeftPanelHeaderButtons";
import { back }               from "../../../utils/default/url";
import { useSelector }        from "react-redux";
import AltPayInfo             from "./AltPayInfo";
import useTicketsToApprovePay from "../../../hooks/useTicketsToApprovePay";

type P = {
  id: MenuViewId
};

export default function CheckAltPayPanel(p: P) {
  const token = useSelector(({ user }: AppState) => user.token);
  const [altPay, refresh] = useTicketsToApprovePay(token),
    [fetching, setFetching] = useState(false);

  const onRefresh = async () => {
    setFetching(true);
    await refresh();
    setFetching(false);
  };

  return (
    <Panel id={p.id}>
      <PanelHeader left={<LeftPanelHeaderButtons back={back} type="back" />}>
        Проверка оплаты
      </PanelHeader>
      <PullToRefresh onRefresh={onRefresh} isFetching={fetching}>
        {token &&
          altPay &&
          altPay.map(ap => (
            <AltPayInfo key={`alt-pay-` + ap._id} ticket={ap} token={token} onRefresh={refresh} />
          ))}
        {token && (!altPay || altPay.length === 0) && (
          <Placeholder
            icon={<Icon56MessageReadOutline />}
            action={<Button size="l" level="tertiary" onClick={onRefresh}>Обновить</Button>}
            stretched
          >
            Новые уведомления<br />отсутствуют
          </Placeholder>
        )}
      </PullToRefresh>
    </Panel>
  );
}
