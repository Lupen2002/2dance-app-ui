// @flow

import React    from 'react';
import { View } from "@vkontakte/vkui";

type P = {
  id: string
}

export const MainView = (p: P) => {
  return (
    <View id={p.id}/>
  )
};
