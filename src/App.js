// @flow

import React, { useMemo }          from "react";
import { navigate, useRoutes }     from "hookrouter";
import { RootEpic }                from "./epic";
import { go, queryStringToObject } from "./utils/default/url";

type Params = { [string]: string };

const routes = {
  "/": () => <RootEpic />,
  "/:epicId": ({ epicId }) => <RootEpic epicId={epicId} />,
  "/:epicId/:panelId": ({ epicId, panelId }) => (
    <RootEpic epicId={epicId} panelId={panelId} />
  )
};

function App() {
  const hash = window.location.hash.substr(1);
  const params: Params = useMemo(() => queryStringToObject(hash), [hash]);

  if (params && params.r) {
    const { r, ...query } = params;
    switch (r) {
      case 'check-params': {
        go('/check-params');
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

export default App;
