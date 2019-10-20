// @flow

import React, { useState }                               from "react";
import { Button, FormLayout, Input, Panel, PanelHeader } from "@vkontakte/vkui";
import LeftPanelHeaderButtons                            from "../../../components/controlls/LeftPanelHeaderButtons";
import { getQueryParams, navigate }                      from "hookrouter";
import { postEvents }                                    from "../../../api";
import { makeDateString }                                from "../../events/edit/utils";

type P = {
  id: MenuViewId
};

const current = () => {
  const date = new Date();
  const iso = date.toISOString().split('T');
  return iso[0]
};

export const AddEventPanel = (p: P) => {
  const query = getQueryParams();
  const [label, setLabel] = useState(""),
    [date, setDate] = useState(current()),
    [time, setTime] = useState('20:00'),
    [singlePrice, setPriceSingle] = useState(),
    [doublePrice, setPriceDouble] = useState();

  const post = async () => {
    if (query && query.vk_group_id) {
      const event: $Rest<DanceEvent, { _id: string }> = {
        vkGroupId: parseInt(query.vk_group_id),
        timestamp: (new Date(`${date}T${time}`)).getTime(),
        label,
        singlePrice,
        doublePrice
      };
      await postEvents(event);
      navigate("/events", false, query);
    }
  };

  return (
    <Panel id={p.id}>
      <PanelHeader
        left={
          <LeftPanelHeaderButtons
            type="cancel"
            back={() => navigate("/events", false, query)}
          />
        }
      >
        Новое событие
      </PanelHeader>
      <FormLayout>
        <Input top="Название" type="text" value={label} onChange={(e) => setLabel(e.currentTarget.value)}/>
        <Input top="Дата" type="date" value={date} onChange={(e) => setDate(e.currentTarget.value)} />
        <Input top="Время" type="time" value={time} onChange={(e) => setTime(e.currentTarget.value)} />
        <Input top="Цена за одиночного" type="number" value={singlePrice} onChange={(e) => setPriceSingle(e.currentTarget.value)} />
        <Input top="Цена за двоих" type="number" value={doublePrice} onChange={(e) => setPriceDouble(e.currentTarget.value)} />
        <Button size="xl" onClick={post}>
          Создать
        </Button>
      </FormLayout>
    </Panel>
  );
};
