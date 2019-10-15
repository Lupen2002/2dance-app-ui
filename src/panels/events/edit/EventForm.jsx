// @flow

import React, {useState}                                  from 'react'
import { Button, Cell, FormLayout, Group, Input } from "@vkontakte/vkui";
import { makeDateString, makeTimeString }         from "./utils";

type P = {
  event: DanceEvent,
  onSubmit: DanceEvent => void
}

const changeDateEvent = (event: DanceEvent, date: string, time: string): DanceEvent => {
  const timestamp = Date.parse(`${date}T${time}`);
  return {...event, timestamp}
};

export default function EventForm(p: P) {
  const [event, setEvent] = useState<DanceEvent>(p.event),
        [d, setD] = useState(makeDateString(event)),
        [t, setT] = useState(makeTimeString(event));

  console.log('!!! EventForm', d);

  return (
    <>
      <FormLayout>
        <Input
          top="Название"
          type="text"
          value={event.label}
          onChange={e => setEvent({...event,
                                       label: e.currentTarget.value
                                     })}
        />
        <Input
          top='Дата'
          type="date"
          value={d}
          onChange={e => setD( e.currentTarget.value)}
        />
        <Input
          top='Время'
          type="time"
          value={t}
          onChange={e => setT( e.currentTarget.value)}
        />
        <Input
          top="Цена одиночного пасса"
          type="number"
          value={event.singlePrice}
          onChange={e => setEvent({...event,
                                    singlePrice: e.currentTarget.value
                                  })}
        />
        <Input
          top="Цена парного пасса"
          type="number"
          value={event.doublePrice}
          onChange={e =>  setEvent({...event,
                                     doublePrice: e.currentTarget.value
                                   })}
        />
        <Button size="xl" onClick={() => p.onSubmit(changeDateEvent(event, d, t))}>
          Сохранить
        </Button>
      </FormLayout>
    </>
  )
}