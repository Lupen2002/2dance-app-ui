// @flow

import React                                           from 'react'
import { ActionSheet, ActionSheetItem, IOS, platform } from "@vkontakte/vkui";

const osname = platform();

type P = {
  onClose: () => void,
  onEdit: () => void,
  onDrop: () => void
}

export default function ContextMenu(p: P) {

  return (
    <ActionSheet onClose={p.onClose}>
      <ActionSheetItem autoclose onClick={p.onEdit}>Редактировать</ActionSheetItem>
      <ActionSheetItem autoclose onClick={p.onDrop} theme="destructive">Разжаловать</ActionSheetItem>
      {osname === IOS && (
        <ActionSheetItem autoclose theme="cancel">
          Отменить
        </ActionSheetItem>
      )}
    </ActionSheet>
  )
}
