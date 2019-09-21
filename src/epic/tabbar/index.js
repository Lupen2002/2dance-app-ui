// @flow

import React from "react";
import {Tabbar, TabbarItem} from '@vkontakte/vkui'
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed'
import Icon28Search from '@vkontakte/icons/dist/28/search'
import Icon28Messages from '@vkontakte/icons/dist/28/messages'
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications'
import Icon28More from '@vkontakte/icons/dist/28/more'

export const AppTabbar = () => {
  return (
    <Tabbar>
      <TabbarItem onClick={() => {}} text="Новости">
        <Icon28Newsfeed />
      </TabbarItem>
      <TabbarItem onClick={() => {}} text="Поиск">
        <Icon28Search />
      </TabbarItem>
      <TabbarItem onClick={() => {}} label="12" text="Сообщения">
        <Icon28Messages />
      </TabbarItem>
      <TabbarItem onClick={() => {}} text="Уведомлен.">
        <Icon28Notifications />
      </TabbarItem>
      <TabbarItem onClick={() => {}} text="Ещё">
        <Icon28More />
      </TabbarItem>
    </Tabbar>
  );
};
