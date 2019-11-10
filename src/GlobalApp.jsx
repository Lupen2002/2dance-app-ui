// @flow

import React         from 'react'
import { useRoutes } from "hookrouter";
import GlobalEpic    from "./epic/global";

const routes = {
  "/": () => <GlobalEpic epicId='main' />,
  "/:epicId": ({ epicId }) => <GlobalEpic epicId={epicId} />,
  "/:epicId/:panelId": ({ epicId, panelId }) => (
    <GlobalEpic epicId={epicId} panelId={panelId} />
  )
};

export default function GlobalApp() {

  return useRoutes(routes);

}
