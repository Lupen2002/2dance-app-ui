// @flow

import React                                        from "react";
import { AppTabbar }                                from "./tabbar";
import { MainView }                                 from "../views/main/MainView";
import { Epic }                                     from "@vkontakte/vkui";
import type { Match, LocationShape, RouterHistory } from "react-router-dom";
import { extractEpicViewId }                        from "./utils";
import useUserToken                                 from "../hooks/useUserToken";

type OP = {
  match: Match,
  location: LocationShape,
  history: RouterHistory
};

type CP = {};

type P = OP & CP;

export const RootEpic = (p: P) => {
  const id: EpicViewId = extractEpicViewId(p.match.params.epicId);

  return (
    <Epic activeStory={id} tabbar={<AppTabbar />}>
      <MainView id="main" />
    </Epic>
  );
};
