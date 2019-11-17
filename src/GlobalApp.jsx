// @flow

import React         from 'react'
import { useRoutes } from "hookrouter";
import GlobalEpic    from "./epic/global";
import useUserToken  from "./hooks/useUserToken";

const routes = {
  "/": () => <GlobalEpic epicId='global-events' />,
  "/:epicId": ({ epicId }) => <GlobalEpic epicId={epicId} />,
  "/:epicId/:panelId": ({ epicId, panelId }) => (
    <GlobalEpic epicId={epicId} panelId={panelId} />
  ),
  "/:epicId/:panelId/:param": ({ epicId, panelId, param }) => (
    <GlobalEpic epicId={epicId} panelId={panelId} param={param} />
  )
};

export default function GlobalApp() {
  useUserToken(false);
  return useRoutes(routes);

}
