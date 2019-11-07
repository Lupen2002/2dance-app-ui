// @flow

import SelectUserList                 from "./SelectUserList";
import React, { useMemo, useState }   from "react";
import useUsers                       from "../../../../hooks/useUsers";
import SelectModal                    from "./SelectModal";

type P = {
  onClose: () => void,
  onSelect: number => Promise<void>
};

export default function SelectUserModal(p: P) {
  const [users] = useUsers(),
    [disabled, setDisabled] = useState(false);

  const onSelect = useMemo(
    () => async (id: number) => {
      if (!disabled) {
        setDisabled(true);
        await p.onSelect(id);
        setDisabled(false);
      }
    },
    [disabled, p]
  );

  return (
    <SelectModal id="select-user" title='Пользователи' onClose={p.onClose}>
      {users && (
        <SelectUserList
          users={users}
          onSelect={onSelect}
          onClose={p.onClose}
        />
      )}
    </SelectModal>
  );
}
