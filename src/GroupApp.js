// @flow

import React, { useState, useMemo, useEffect } from "react";
import { useRoutes } from "hookrouter";
import { RootEpic } from "./epic/group";
import { queryStringToObject } from "./utils/default/url";
import useUserToken from "./hooks/useUserToken";
import useNavigate from "./hooks/useNavigate";

type Params = { [string]: string };

const routes = {
  "/": () => <RootEpic />,
  "/:epicId": ({ epicId }) => <RootEpic epicId={epicId} />,
  "/:epicId/:panelId": ({ epicId, panelId }) => (
    <RootEpic epicId={epicId} panelId={panelId} />
  )
};

function GroupApp() {
  const token = useUserToken(),
        [redirect, setRedirect] = useState(null),
    [go, params, setParams] = useNavigate();
  const hash = window.location.hash.substr(1);
  const hashParams: Params = useMemo(() => queryStringToObject(hash), [hash]);

  useEffect(() => {
    const {r, ...q} = hashParams;
    setRedirect(r);
    setParams({ ...params, ...q });
  }, [params, setParams, hashParams]);

  useEffect(() => {
    if (token && redirect) {
      switch (redirect) {
        case "check-params": {
          go("/check-params");
          setRedirect(null);
          break;
        }
        case "reg-on-reception": {
          go("/events/reg-on-reception");
          setRedirect(null);
          break;
        }
        case "root": {
          go("/");
          setRedirect(null);
          break;
        }
        case "ym-success": {
          go("/events/ym-success");
          setRedirect(null);
          break;
        }
        default:
          setRedirect(null);
          break;
      }
    }
  }, [token, go, redirect]);

  return useRoutes(routes);
}

export default GroupApp;
