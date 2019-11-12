// @flow

import React, { useMemo, useEffect } from "react";
import { ActionSheet, ActionSheetItem, IOS, platform } from "@vkontakte/vkui";
import useCheckRole from "../../../hooks/useCheckRole";
import useNavigate from "../../../hooks/useNavigate";

type P = {
  event: DanceEvent,
  onClose: () => void
};

const osname = platform();

const roles = ["admin", "editor"];

export default function AdminPopoutEvent(p: P) {
  const isAccessEdit = useCheckRole(roles),
    [go, params, setParams] = useNavigate();

  useEffect(() => {
    setParams({ ...params, event_id: p.event._id });
  }, [params, setParams, p]);

  const goEdit = useMemo(
    () => () => {
      go("/events/edit");
    },
    [go]
  );

  const goListGuest = useMemo(
    () => () => {
      go("/events/list-guests");
    },
    [go]
  );

  const onClose = useMemo(
    () => () => {
      const { event_id, ...q } = params;
      setParams(q);
      p.onClose()
    },
    [p, params, setParams]
  );

  return (
    <>
      <ActionSheet onClose={onClose}>
        {isAccessEdit && (
          <ActionSheetItem autoclose onClick={goEdit}>
            Редактировать
          </ActionSheetItem>
        )}
        <ActionSheetItem autoclose onClick={goListGuest}>
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
