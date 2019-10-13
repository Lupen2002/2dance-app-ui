// @flow

import React, {useState}                                  from 'react'
import { Button, Cell, FormLayout, Group, Input } from "@vkontakte/vkui";
import { makeDateString, makeTimeString }         from "./utils";

type P = {
  event: DanceEvent,
  onSubmit: DanceEvent => void
}

const changeDateEvent = (event: DanceEvent, date: string) => {
  const time = makeTimeString(event);
  return (new Date(`${date}T${time}`)).getTime()
};

const changeTimeEvent = (event: DanceEvent, time: string) => {
  const date = makeDateString(event);
  return (new Date(`${date}T${time}`)).getTime()
};

export default function EventForm(p: P) {
  const [event, setEvent] = useState<DanceEvent>(p.event);

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
          top="Дата"
          type="date"
          value={makeDateString(event)}
          onChange={e => setEvent({...event,
                                       timestamp: changeDateEvent(event, e.currentTarget.value)
                                     })}
        />
        <Input
          top="Время"
          type="time"
          value={makeTimeString(event)}
          onChange={e => setEvent({...event,
                                    timestamp: changeTimeEvent(event, e.currentTarget.value)
                                  })}
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
        <Button size="xl" onClick={() => p.onSubmit(event)}>
          Сохранить
        </Button>
      </FormLayout>
    </>
  )
}