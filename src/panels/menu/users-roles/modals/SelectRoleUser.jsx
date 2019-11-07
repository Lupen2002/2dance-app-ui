// @flow

import React, { useMemo, useState } from "react";
import SelectModal                  from "./SelectModal";
import { Avatar, Cell, List }       from "@vkontakte/vkui";

type P = {
  onClose: () => void,
  onSelect: ('admin' | 'editor' | 'reception') => Promise<void>
};

const roles = [
  {
    label: 'Ресепшин',
    description: 'Может сканировать билеты, а так же видеть список гостей',
    code: 'reception'
  },
  {
    label: 'Редактор',
    description: 'Ресепшин + создание и редактирование событий',
    code: 'editor'
  },
  {
    label: 'Администратор',
    description: 'Редактор + настройки приложения',
    code: 'admin'
  },
];

export default function SelectRoleUserModal(p: P) {
  const [disabled, setDisabled] = useState(false);

  const onSelect = useMemo(
    () => async (role: ('admin' | 'editor' | 'reception')) => {
      if (!disabled) {
        setDisabled(true);
        await p.onSelect(role);
        p.onClose();
        setDisabled(false);
      }
    },
    [disabled, p]
  );

  return (
    <SelectModal title='Роль пользователя' onClose={p.onClose}>
      <List>
        {roles.map(r => (
          <Cell key={'role-'+r.code} onClick={() => onSelect(r.code)} before={<Avatar size={32}/>} description={r.description}>{r.label}</Cell>
        ))}
      </List>
    </SelectModal>
  );
}
