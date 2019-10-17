// @flow

import React, { useMemo }                              from "react";
import { ActionSheet, ActionSheetItem, IOS, platform } from "@vkontakte/vkui";
import useStartParams                                  from "../../../hooks/useStartParams";
import { getQueryParams, navigate, setQueryParams }    from "hookrouter";

type P = {
  event: DanceEvent,
  onClose: () => void
};

const osname = platform();

export default function AdminPopoutEvent(p: P) {

  const go2 = useMemo(
    () => (to: EventsViewId, event: DanceEvent) => () => {
      setQueryParams({...getQueryParams(), event_id: event._id});
      navigate("/events/"+to, false, getQueryParams());
    },
    []
  );

  return (
    <>
      <ActionSheet onClose={p.onClose}>
        <ActionSheetItem autoclose onClick={go2('edit', p.event)}>
          Редактировать
        </ActionSheetItem>
        <ActionSheetItem autoclose onClick={go2('list-guests', p.event)}>
          Список гостей
        </ActionSheetItem>
        {osname === IOS && (
          <ActionSheetItem autoclose theme="cancel">
            Отменить
          </ActionSheetItem>
        )}
      </ActionSheet>
    </>
  );
}
