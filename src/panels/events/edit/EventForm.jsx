// @flow

import React, { useState } from "react";
import {
  Checkbox,
  Button,
  FormLayout,
  Input,
  FormLayoutGroup,
  CellButton,
  Separator
} from "@vkontakte/vkui";
import { dateLocal2ISO, makeDateString, makeTimeString } from "./utils";
import { getLocalDate } from "../../../utils/default/date";

type ExcludeDanceEvent = {| _id: string |};
type NDanceEvent = $Rest<DanceEvent, ExcludeDanceEvent>;
type DE = DanceEvent | NDanceEvent;

type P = {
  event: DE,
  onSubmit: DE => void
};

const defaultPrice = (): EventPrice => ({
  date: dateLocal2ISO(new Date().toLocaleDateString()),
  singlePrice: 0,
  doublePrice: 0
});

const changeDateEvent = (event: DE, date: string, time: string): DE => {
  const timestamp = getLocalDate(`${date}T${time}`).getTime();
  return { ...event, timestamp };
};

export default function EventForm(p: P) {
  const [event, setEvent] = useState<DE>(p.event),
    [d, setD] = useState(makeDateString(event)),
    [t, setT] = useState(makeTimeString(event));

  const onChangePrice = (i: number, price: EventPrice) => {
    if (event.prices) {
      const prices = [...event.prices];
      prices[i] = price;
      setEvent({ ...event, prices });
    }
  };

  return (
    <>
      <FormLayout>
        <Input
          top="Название"
          type="text"
          value={event.label}
          onChange={e => setEvent({ ...event, label: e.currentTarget.value })}
        />
        <Input
          top="Дата"
          type="date"
          value={d}
          onChange={e => setD(e.currentTarget.value)}
        />
        <Input
          top="Время"
          type="time"
          value={t}
          onChange={e => setT(e.currentTarget.value)}
        />
        <Input
          top="Цена одиночного пасса"
          type="number"
          value={event.singlePrice}
          onChange={e =>
            setEvent({ ...event, singlePrice: e.currentTarget.value })
          }
        />
        <Input
          top="Цена парного пасса"
          type="number"
          value={event.doublePrice}
          onChange={e =>
            setEvent({ ...event, doublePrice: e.currentTarget.value })
          }
        />
        <Separator />
        <Checkbox
          checked={event.prices}
          onChange={e =>
            setEvent({ ...event, prices: e.target.checked ? [] : undefined })
          }
        >
          Переменная цена
        </Checkbox>
        {event.prices ? (
          <>
            {event.prices.map((p, i) => (
              <FormLayoutGroup
                key={"price-" + i}
                top={`Изменение цены №${i + 1}`}
              >
                <Input
                  top="День новой цены"
                  type="date"
                  value={p.date}
                  onChange={e =>
                    onChangePrice(i, { ...p, date: e.currentTarget.value })
                  }
                />
                <Input
                  top="Цена за одного"
                  type="number"
                  value={p.singlePrice}
                  onChange={e =>
                    onChangePrice(i, {
                      ...p,
                      singlePrice: e.currentTarget.value
                    })
                  }
                />
                <Input
                  top="Цена за двоих"
                  type="number"
                  value={p.doublePrice}
                  onChange={e =>
                    onChangePrice(i, {
                      ...p,
                      doublePrice: e.currentTarget.value
                    })
                  }
                />
                <CellButton
                  align="center"
                  level='danger'
                  before={<i className="fas fa-minus" />}
                  onClick={() => {
                    const prices = [...event.prices];
                    prices.splice(i, 1);
                    setEvent({ ...event, prices });
                  }}
                >
                  Удалить изменение цены
                </CellButton>
                <Separator />
              </FormLayoutGroup>
            ))}
            <CellButton
              align="center"
              before={<i className="fas fa-plus" />}
              onClick={() =>
                setEvent({
                  ...event,
                  prices: [...event.prices, defaultPrice()]
                })
              }
            >
              Добавить
            </CellButton>
          </>
        ) : (
          <></>
        )}
        {/*<Checkbox
          checked={event.rePostControl}
          onChange={e =>
            setEvent({ ...event, rePostControl: e.target.checked })
          }
        >
          Скидка c репостом
        </Checkbox>*/}
        <Button
          size="xl"
          onClick={() => p.onSubmit(changeDateEvent(event, d, t))}
        >
          Сохранить
        </Button>
      </FormLayout>
    </>
  );
}
