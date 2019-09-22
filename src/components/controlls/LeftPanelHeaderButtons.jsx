// @flow

import React from "react";
import { HeaderButton, IOS, platform } from "@vkontakte/vkui";
import Cancel from "@vkontakte/icons/dist/24/cancel";
import Back from "@vkontakte/icons/dist/24/back";

const osname = platform();

type Props = {
  type?: "cancel" | "back",
  back?: () => void
};

const LeftPanelHeaderButtons = (p: Props) => {
  if (p.back) {
    return (
      <HeaderButton onClick={p.back}>
        {p.type === "cancel" && (osname === IOS ? "Отмена" : <Cancel />)}
        {p.type === "back" && (osname === IOS ? "Назад" : <Back />)}
      </HeaderButton>
    );
  } else {
    return <></>;
  }
};

export default LeftPanelHeaderButtons;
