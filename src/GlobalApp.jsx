// @flow

import React           from 'react'
import { useRoutes }   from "hookrouter";
import GlobalEpic      from "./epic/global";
import useUserToken    from "./hooks/useUserToken";
import useNavigate     from "./hooks/useNavigate";
import ConfirmEpic     from "./epic/confirm/ConfirmEpic";

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
  const [go, params] = useNavigate();
  const token = useUserToken(params.vk_access_token_settings && /groups/.test(params.vk_access_token_settings));
  const routers = useRoutes(routes);

  if ((params.vk_access_token_settings && /groups/.test(params.vk_access_token_settings)) && token) {
    return routers;
  }
  return <ConfirmEpic />

}
