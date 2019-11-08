// @flow

import React, { useMemo }          from "react";
import { navigate, useRoutes }     from "hookrouter";
import { RootEpic }                from "./epic/group";
import { go, queryStringToObject } from "./utils/default/url";
import useUserToken                from "./hooks/useUserToken";

type Params = { [string]: string };

const routes = {
  "/": () => <RootEpic />,
  "/:epicId": ({ epicId }) => <RootEpic epicId={epicId} />,
  "/:epicId/:panelId": ({ epicId, panelId }) => (
    <RootEpic epicId={epicId} panelId={panelId} />
  )
};

function GroupApp() {
  const token = useUserToken();
  const hash = window.location.hash.substr(1);
  const params: Params = useMemo(() => queryStringToObject(hash), [hash]);

  if (token && params && params.r) {
    const { r, ...query } = params;
    switch (r) {
      case 'check-params': {
        go('/check-params');
        break;
      }
      case 'reg-on-reception': {
        go('/events/reg-on-reception', params, false);
        break;
      }
      case "root": {
        navigate("/", false, query);
        break;
      }
      case "ym-success": {
        navigate("/events/ym-success", false, query);
        break;
      }
      default: break;
    }
  }

  return useRoutes(routes);
}

export default GroupApp;
