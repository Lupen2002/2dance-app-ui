// @flow

import React, { useState }                                from "react";
import LeftPanelHeaderButtons                             from "../../../components/controlls/LeftPanelHeaderButtons";
import { back }                                           from "../../../utils/default/url";
import { Button, FormLayout, Panel, PanelHeader, Select } from "@vkontakte/vkui";
import { Input, Radio }                                          from "@vkontakte/vkui";
import useNavigate                                        from "../../../hooks/useNavigate";
import { postTickets }                                    from "../../../api";

type P = {
  id: EventsViewId
};

export default function AddGuestPanel(p: P) {
  const [go, params] = useNavigate(),
        [payType, setPayType] = useState(""),
        [sex, setSex] = useState(1),
        [firstName, setFirstName] = useState(""),
        [lastName, setLastName] = useState("");

  const onSubmit = async () => {
    const ticket: $Rest<Ticket, {|_id: string|}> = {
      offlineUser: {
        first_name: firstName,
        last_name: lastName,
        sex,
      },
      vkGroupId: parseInt(params.vk_group_id),
      eventId: params.event_id,
      ticketType: 'single-pass',
      isClose: true,
      altPay: {
        comment: payType,
        approve: true,
        createdAt: Date.now()
      }
    };
    await postTickets(ticket);
    back();
  };

  return (
    <Panel id={p.id}>
      <PanelHeader left={<LeftPanelHeaderButtons type="cancel" back={back} />}>
        Новый гость
      </PanelHeader>
      <FormLayout>
        <Input top="Имя" value={firstName} onChange={e => setFirstName(e.currentTarget.value)}/>
        <Input top="Фамилия" value={lastName} onChange={e => setLastName(e.currentTarget.value)}/>
        <div>
          <Radio name="sex" value="1" checked={sex === 1} onChange={() => setSex(1)}>Партнер</Radio>
          <Radio name="sex" value="2" checked={sex === 2} onChange={() => setSex(2)}>Партнерша</Radio>
        </div>
        <Select
          value={payType}
          placeholder="Способ оплаты?"
          onChange={e => setPayType(e.currentTarget.value)}
        >
          <option value="Наличными">Наличными</option>
          <option value="На Сбербанк">На Сбербанк</option>
          <option value="На Тинькофф">На Тинькофф</option>
          <option value="На Яндекс">На Яндекс</option>
          <option value="На VK">На VK</option>
        </Select>
        <Button size="xl" onClick={onSubmit}>Добавить</Button>
      </FormLayout>
    </Panel>
  );
}
