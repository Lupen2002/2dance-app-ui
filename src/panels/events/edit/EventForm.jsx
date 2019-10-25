// @flow

import React, { useState } from "react";
import {
  Checkbox,
  Button,
  FormLayout,
  Input,
  CellButton,
  Separator,
  Header
} from "@vkontakte/vkui";
import { makeDateString, makeTimeString } from "./utils";
import { getLocalDate } from "../../../utils/default/date";

type ExcludeDanceEvent = {| _id: string |};
type NDanceEvent = $Rest<DanceEvent, ExcludeDanceEvent>;
type DE = DanceEvent | NDanceEvent;

type P = {
  event: DE,
  onSubmit: DE => void
};

const defaultPrice = (): EventPrice => ({
  date: makeDateString({timestamp: Date.now()}),
  time: makeTimeString({timestamp: Date.now()}),
  timestamp: Date.now(),
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

  const onChangeDate = (i: number, price: EventPrice, date: string) => {
    const datetime = `${date}T${makeTimeString(price)}`;
    const timestamp = getLocalDate(datetime).getTime();
    onChangePrice(i, { ...price, timestamp });
  };

  const onChangeTime = (i: number, price: EventPrice, time: string) => {
    const datetime = `${makeDateString(price)}T${time}`;
    const timestamp = getLocalDate(datetime).getTime();
    onChangePrice(i, { ...price, timestamp });
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
          checked={!!event.prices}
          value="prices"
          onChange={e =>
            setEvent({ ...event, prices: e.target.checked ? [] : undefined })
          }
        >
          Переменная цена
        </Checkbox>
        {event.prices ? (
          <>
            {event.prices.map((p, i) => (
              <FormLayout TagName="div" key={"price-" + i}>
                <Header level="secondary">{`Изменение цены №${i + 1}`}</Header>
                <Input
                  top="День новой цены"
                  type="date"
                  value={makeDateString(p)}
                  onChange={e => onChangeDate(i, p, e.currentTarget.value)}
                />
                <Input
                  top="Время новой цены"
                  type="time"
                  value={makeTimeString(p)}
                  onChange={e => onChangeTime(i, p, e.currentTarget.value)}
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
                  level="danger"
                  before={<i className="fas fa-minus" />}
                  onClick={() => {
                    const prices = [...(event.prices || [])];
                    prices.splice(i, 1);
                    setEvent({ ...event, prices });
                  }}
                >
                  Удалить изменение цены
                </CellButton>
                <Separator />
              </FormLayout>
            ))}
            <CellButton
              align="center"
              before={<i className="fas fa-plus" />}
              onClick={() =>
                setEvent({
                  ...event,
                  prices: [...(event.prices || []), defaultPrice()]
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
