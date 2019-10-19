// @flow

import React, { useMemo } from "react";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import { getQueryParams, navigate } from "hookrouter";

type P = {
  event: DanceEvent
};

export default function EventCellBottomContent(p: P) {
  const query = useMemo(getQueryParams, []);

  const go = useMemo(
    () => (panelId: EventsViewId, event_id: string) => () => {
      navigate("/events/"+panelId, false, { ...query, event_id });
    },
    [query]
  );
  return (
    <div>
      <Button size="m" onClick={go('bay-pass', p.event._id)}>
        Записаться
      </Button>
      {/*{query && query.vk_viewer_group_role === 'admin' && (
        <Button size="m" level='secondary' onClick={go('edit', p.event._id)}>
          <i className='fas fa-pen'/> Редактировать
        </Button>
      )}*/}
    </div>
  );
}
